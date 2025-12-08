const isProduction = process.env.NODE_ENV === 'production';

// Detect custom domain (e.g., smarttrader.deriv.now)
const isCustomDomain = typeof window !== 'undefined' &&
    /smarttrader\.deriv\.now/i.test(window.location.hostname);

const brand_config_data = {
    brand_name: 'Deriv',
    brand_logo: 'deriv-com-logo.svg',
    brand_domain: 'deriv.com',
    brand_hostname: {
        staging: 'staging-home.deriv.com/dashboard',
        production: 'home.deriv.com/dashboard',
    },
    platform: {
        name: 'Derivatives SmartTrader',
        logo: 'logo_smart_trader.svg',
        hostname: {
            staging: 'staging-dsmarttrader.deriv.com',
            production: 'dsmarttrader.deriv.com',
        },
    },
    // Custom domain configuration
    custom_domain: {
        hostname: 'smarttrader.deriv.now',
        login_url: 'https://app.deriv.now',  // Deriv Fork login URL
    },
};

const getBrandName = () => brand_config_data.brand_name;
const getBrandLogo = () => brand_config_data.brand_logo;
const getBrandDomain = () => brand_config_data.brand_domain;
// Helper function to build brand URLs with environment detection
const getBrandUrl = (path = '') => {
    const hostname = isProduction
        ? brand_config_data.brand_hostname.production
        : brand_config_data.brand_hostname.staging;

    // Return complete URL with optional path
    return `https://${hostname}${path ? `/${path}` : ''}`;
};

const getBrandHomeUrl = () => getBrandUrl('home');

// For custom domain, redirect to custom login URL
const getBrandLoginUrl = () => {
    if (isCustomDomain) {
        return brand_config_data.custom_domain.login_url;
    }
    return getBrandUrl('login');
};

const getBrandSignupUrl = () => getBrandUrl('signup');
const getPlatformName = () => brand_config_data.platform.name;
const getPlatformLogo = () => brand_config_data.platform.logo;

// For custom domain, use custom hostname
const getPlatformHostname = () => {
    if (isCustomDomain) {
        return brand_config_data.custom_domain.hostname;
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

