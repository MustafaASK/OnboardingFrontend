(function (window) {
    window.__envColors = window.__envColors || {};
    //window.__envColors.fileServerIp = '111.93.6.103:998';

    //** Dev Environment  **
    // window.__envColors.fileServerIp = '192.168.1.198:9000/Onboarding';


    //** Testing Environment  **
    window.__envColors.fileServerIp = '192.168.1.197:9000/OnBoarding';

    //** Testing Environment FOR MANISH **
    //window.__envColors.fileServerIp = '111.93.6.98:998/Onboarding';


    //** Production performance Environment  **
    // window.__envColors.fileServerIp = 'onboard.askstaffing.com/onboarding_docs_perf';

    //** Production Environment  **
    //window.__envColors.fileServerIp = 'onboard.askstaffing.com/onboarding_docs';

    window.__envColors.secondaryColor = 'd75a5a';
    window.__envColors.logoSrc = 'http://' + window.__envColors.fileServerIp + '/Branding/logo/logo_image.png';
    window.__envColors.backgroundSrc = 'http://' + window.__envColors.fileServerIp + '/Branding/bgimg/bg_image.jpg';
}(this));