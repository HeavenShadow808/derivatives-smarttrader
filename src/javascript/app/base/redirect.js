const defaultRedirectUrl = require('./client').defaultRedirectUrl;
const Url                = require('../../_common/url');

const Redirect = (() => {
    const onLoad = () => {
        const params = Url.paramsHash();
        
        // Handle redirect from main app (deriv.now) after OAuth login
        // Main app will redirect back with OAuth tokens (acct1, token1, etc.)
        // These tokens need to be exchanged for session_token via WebSocket API
        if (params.acct1 && params.token1) {
            // Extract OAuth tokens
            const tokens = {};
            let index = 1;
            while (params[`acct${index}`] && params[`token${index}`]) {
                tokens[`acct${index}`] = params[`acct${index}`];
                tokens[`token${index}`] = params[`token${index}`];
                if (params[`cur${index}`]) {
                    tokens[`cur${index}`] = params[`cur${index}`];
                }
                index++;
            }
            
            // Store tokens temporarily
            if (tokens.acct1 && tokens.token1) {
                localStorage.setItem('config.tokens', JSON.stringify(tokens));
                localStorage.setItem('config.account1', tokens.token1);
                localStorage.setItem('active_loginid', tokens.acct1);
                
                // Remove OAuth params from URL
                const url = new URL(window.location.href);
                ['acct1', 'token1', 'cur1', 'acct2', 'token2', 'cur2'].forEach(param => {
                    url.searchParams.delete(param);
                });
                window.history.replaceState({}, '', url.toString());
                
                // The token will be exchanged for session_token in socket_base.js
                // Redirect to trading page - socket_base.js will handle token exchange
                window.location.href = defaultRedirectUrl();
                return;
            }
        }
        
        const actions_map = {
            signup                : { path: 'new_account/virtualws' },
            reset_password        : { path: 'user/reset_passwordws' },
            payment_withdraw      : { path: 'cashier/forwardws', query: 'action=withdraw' },
            payment_agent_withdraw: { path: 'paymentagent/withdrawws' },
            mt5_password_reset    : { path: 'user/metatrader' },
        };

        const config = actions_map[params.action];
        // need to redirect not using pjax
        window.location.href = config && params.code ?
            `${Url.urlFor(config.path, config.query, params.lang || '')}#token=${params.code}` :
            defaultRedirectUrl();
    };

    return {
        onLoad,
    };
})();

module.exports = Redirect;
