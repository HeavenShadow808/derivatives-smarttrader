const isProduction = process.env.NODE_ENV === 'production';

const brand_config_data = {
    brand_name    : 'Deriv',
    brand_logo    : 'deriv-com-logo.svg',
    brand_domain  : 'deriv.com',
    brand_hostname: {
        staging   : 'staging-home.deriv.com/dashboard',
        production: 'home.deriv.com/dashboard',
    },
    platform: {
        name    : 'Derivatives SmartTrader',
        logo    : 'logo_smart_trader.svg',
        hostname: {
            staging   : 'staging-dsmarttrader.deriv.com',
            production: 'dsmarttrader.deriv.com',
        },
    },
};

const getBrandName = () => brand_config_data.brand_name;
const getBrandLogo = () => brand_config_data.brand_logo;
const getBrandDomain = () => {
    // For custom domain (smarttrader.deriv.now), use deriv.now domain
    const isCustomDomain = /smarttrader\.deriv\.now/i.test(window.location.hostname);
    return isCustomDomain ? 'deriv.now' : brand_config_data.brand_domain;
};

// Helper function to build brand URLs with environment detection
const getBrandUrl = (path = '') => {
    // For custom domain (smarttrader.deriv.now), use main app (deriv.now)
    const isCustomDomain = /smarttrader\.deriv\.now/i.test(window.location.hostname);
    
    if (isCustomDomain) {
        // Use main app (deriv.now) for all brand URLs
        const mainAppUrl = 'https://deriv.now';
        if (path === 'login') {
            // Redirect to main app login, which will redirect back to SmartTrader after login
            const currentUrl = encodeURIComponent(window.location.href);
            return `${mainAppUrl}/redirect?redirect_to=${currentUrl}`;
        }
        return `${mainAppUrl}${path ? `/${path}` : ''}`;
    }
    
    const hostname = isProduction
        ? brand_config_data.brand_hostname.production
        : brand_config_data.brand_hostname.staging;
    
    // Return complete URL with optional path
    return `https://${hostname}${path ? `/${path}` : ''}`;
};

const getBrandHomeUrl = () => getBrandUrl('home');
const getBrandLoginUrl = () => getBrandUrl('login');
const getBrandSignupUrl = () => getBrandUrl('signup');
const getPlatformName = () => brand_config_data.platform.name;
const getPlatformLogo = () => brand_config_data.platform.logo;
const getPlatformHostname = () => {
    // For custom domain (smarttrader.deriv.now), return the custom domain
    const isCustomDomain = /smarttrader\.deriv\.now/i.test(window.location.hostname);
    if (isCustomDomain) {
        return 'smarttrader.deriv.now';
    }
    return isProduction
        ? brand_config_data.platform.hostname.production
        : brand_config_data.platform.hostname.staging;
};

// Legacy compatibility function - now returns smarttrader platform info
const getPlatformSettings = (platform_key) => {
    if (platform_key === 'smarttrader') {
        return {
            name: brand_config_data.platform.name,
            icon: brand_config_data.platform.logo,
        };
    }
    return null;
};

module.exports = {
    getBrandName,
    getBrandLogo,
    getBrandDomain,
    getBrandUrl,
    getBrandHomeUrl,
    getBrandLoginUrl,
    getBrandSignupUrl,
    getPlatformName,
    getPlatformLogo,
    getPlatformHostname,
    getPlatformSettings, // Legacy compatibility
};
