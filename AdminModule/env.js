(function (window) {
    window.__env = window.__env || {};
    window.__env.maxNumOfRecordsSubWebForms = 10;
    // window.__env.apiServerIp = '111.93.6.103:999';
    // window.__env.fileServerIp = '111.93.6.103:998';

    //**   Dev Environment **
    window.__env.apiServerIp = '192.168.1.198:8080';
    window.__env.fileServerIp = '192.168.1.198:9000';
    window.__env.CandidateAPIURL = 'http://192.168.1.198:8080/Candidate/';
    window.__env.CandidateDocsURL = 'http://192.168.1.198:9000/OnBoardingNew/Candidatedocs/';
    window.__env.SignedOfferLetterURL = 'http://192.168.1.198:9000/OnBoardingNew/Echosign/';
    window.__env.offerLetterPreview = 'http://192.168.1.198:9000/OnBoardingNew/tempDelete/';
    window.__env.APIURL = 'http://' + window.__env.apiServerIp + '/OnBoardingNew/';
    window.__env.UploadsURL = 'http://' + window.__env.fileServerIp;
    window.__env.DocsURL = 'http://' + window.__env.fileServerIp + '/OnBoardingNew/Docs/';
    window.__env.NewHireDocsURL = 'http://' + window.__env.fileServerIp + '/OnBoardingNew/NewHire/';
    window.__env.SignImageURL = 'https://onboard.askstaffing.com/onboarding_docs/Signatures/signature_logo.png';
    window.__env.EchoDocsURL = 'http://' + window.__env.fileServerIp + '/OnBoardingNew/Echosign/';
    window.__env.ProfilePicURL = 'http://' + window.__env.fileServerIp + '/OnBoardingNew/Profilepic/';
    window.__env.ImagesURL = 'http://' + window.__env.fileServerIp + '/OnBoardingNew/Introduction/';
    window.__env.LogoURL = 'http://' + window.__env.fileServerIp + '/OnBoardingNew/Branding/logo/logo_image.';
    window.__env.BackgroundURL = 'http://' + window.__env.fileServerIp + '/OnBoardingNew/Branding/bgimg/bg_image.';
    window.__env.FrontEndURL = 'http://192.168.1.39:1337/#/'; //for forgot password email
    window.__env.FrontEndURLForCandidate = 'http://192.168.1.39:1338/#/reset/'; //for forgot password email of candidate
    window.__env.FrontEndURLForCandidateLogin = 'http://192.168.1.39:1338/#/login';
    window.__env.baseUrl = '/';
    window.__env.rootUrl = '';
    window.__env.enableDebug = false;
    window.__env.idleTime = 2 * 60 * 60;
    

    /* test dev*/
    // window.__env.apiServerIp = '192.168.1.198:8080';
    // window.__env.fileServerIp = '192.168.1.198:9000';
    // window.__env.CandidateAPIURL = 'http://192.168.1.198:8080/COB/';
    // window.__env.CandidateDocsURL = 'http://192.168.1.198:9000/OnBoarding/Candidatedocs/';
    // window.__env.SignedOfferLetterURL = 'http://192.168.1.198:9000/OnBoarding/Echosign/';
    // window.__env.offerLetterPreview = 'http://192.168.1.198:9000/OnBoarding/tempDelete/';
    // window.__env.APIURL = 'http://' + window.__env.apiServerIp + '/OnBoarding/';
    // window.__env.UploadsURL = 'http://' + window.__env.fileServerIp;
    // window.__env.DocsURL = 'http://' + window.__env.fileServerIp + '/OnBoarding/Docs/';
    // window.__env.NewHireDocsURL = 'http://' + window.__env.fileServerIp + '/OnBoarding/NewHire/';
    // window.__env.SignImageURL = 'https://onboard.askstaffing.com/onboarding_docs/Signatures/signature_logo.png';
    // window.__env.EchoDocsURL = 'http://' + window.__env.fileServerIp + '/OnBoarding/Echosign/';
    // window.__env.ProfilePicURL = 'http://' + window.__env.fileServerIp + '/OnBoarding/Profilepic/';
    // window.__env.ImagesURL = 'http://' + window.__env.fileServerIp + '/OnBoarding/Introduction/';
    // window.__env.LogoURL = 'http://' + window.__env.fileServerIp + '/OnBoarding/Branding/logo/logo_image.';
    // window.__env.BackgroundURL = 'http://' + window.__env.fileServerIp + '/OnBoarding/Branding/bgimg/bg_image.';
    // window.__env.FrontEndURL = 'http://192.168.1.39:8900/hrUser/#/'; //for forgot password email
    // window.__env.FrontEndURLForCandidate = 'http://192.168.1.39:8900/onboarding/#/reset/'; //for forgot password email of candidate
    // window.__env.FrontEndURLForCandidateLogin = 'http://192.168.1.39:8900/onboarding/#/login';
    // window.__env.baseUrl = '/';
    // window.__env.rootUrl = '/hrUser';
    // window.__env.enableDebug = false;
    // window.__env.idleTime = 2 * 60 * 60;

    // //**  Testing Environment  **
    // window.__env.apiServerIp = '192.168.1.197:8900';
    // window.__env.fileServerIp = '192.168.1.197:9000';
    // window.__env.CandidateAPIURL = 'http://192.168.1.197:8900/onboarding_cob/';
    // window.__env.CandidateDocsURL = 'http://192.168.1.197:9000/OnBoarding/Candidatedocs/';
    // window.__env.SignedOfferLetterURL = 'http://192.168.1.197:9000/OnBoarding/Echosign/';
    // window.__env.offerLetterPreview = 'http://192.168.1.197:9000/OnBoarding/tempDelete/';
    // window.__env.APIURL = 'http://' + window.__env.apiServerIp + '/onboarding_admin/';
    // window.__env.UploadsURL = 'http://' + window.__env.fileServerIp;
    // window.__env.DocsURL = 'http://' + window.__env.fileServerIp + '/OnBoarding/Docs/';
    // window.__env.NewHireDocsURL = 'http://' + window.__env.fileServerIp + '/OnBoarding/NewHire/';
    // window.__env.SignImageURL = 'https://onboard.askstaffing.com/onboarding_docs/Signatures/signature_logo.png';
    // window.__env.EchoDocsURL = 'http://' + window.__env.fileServerIp + '/OnBoarding/Echosign/';
    // window.__env.ProfilePicURL = 'http://' + window.__env.fileServerIp + '/OnBoarding/Profilepic/';
    // window.__env.ImagesURL = 'http://' + window.__env.fileServerIp + '/OnBoarding/Introduction/';
    // window.__env.LogoURL = 'http://' + window.__env.fileServerIp + '/OnBoarding/Branding/logo/logo_image.';
    // window.__env.BackgroundURL = 'http://' + window.__env.fileServerIp + '/OnBoarding/Branding/bgimg/bg_image.';
    // window.__env.FrontEndURL = 'http://192.168.1.197:8900/hruser/#/'; //for forgot password email
    // window.__env.FrontEndURLForCandidate = 'http://192.168.1.197:8900/onboarding/#/reset/'; //for forgot password email of candidate
    // window.__env.FrontEndURLForCandidateLogin = 'http://192.168.1.197:8900/onboarding/#/login';
    // window.__env.baseUrl = '/';
    // window.__env.rootUrl = '/hruser';
    // window.__env.enableDebug = false;
    // window.__env.idleTime = 2 * 60 * 60;

    // //**  Testing Environment FOR MANISH **
    // window.__env.apiServerIp = '111.93.6.98:997';
    // window.__env.fileServerIp = '111.93.6.98:998';
    // window.__env.CandidateAPIURL = 'http://111.93.6.98:997/onboarding_cob/';
    // window.__env.CandidateDocsURL = 'http://111.93.6.98:998/OnBoarding/Candidatedocs/';
    // window.__env.SignedOfferLetterURL = 'http://111.93.6.98:998/OnBoarding/Echosign/';
    //window.__env.offerLetterPreview = 'http://111.93.6.98:998/OnBoarding/tempDelete/';
    // window.__env.APIURL = 'http://' + window.__env.apiServerIp + '/onboarding_admin/';
    // window.__env.UploadsURL = 'http://' + window.__env.fileServerIp;
    // window.__env.DocsURL = 'http://' + window.__env.fileServerIp + '/OnBoarding/Docs/';
    // window.__env.NewHireDocsURL = 'http://' + window.__env.fileServerIp + '/OnBoarding/NewHire/';
    // window.__env.SignImageURL = 'https://onboard.askstaffing.com/onboarding_docs/Signatures/signature_logo.png';
    // window.__env.EchoDocsURL = 'http://' + window.__env.fileServerIp + '/OnBoarding/Echosign/';
    // window.__env.ProfilePicURL = 'http://' + window.__env.fileServerIp + '/OnBoarding/Profilepic/';
    // window.__env.ImagesURL = 'http://' + window.__env.fileServerIp + '/OnBoarding/Introduction/';
    // window.__env.LogoURL = 'http://' + window.__env.fileServerIp + '/OnBoarding/Branding/logo/logo_image.';
    // window.__env.BackgroundURL = 'http://' + window.__env.fileServerIp + '/OnBoarding/Branding/bgimg/bg_image.';
    // window.__env.FrontEndURL = 'http://111.93.6.98:997/onboarding_test/#/'; //for forgot password email
    // window.__env.FrontEndURLForCandidate = 'http://111.93.6.98:997/onboarding_test/#/candidate/reset/'; //for forgot password email of candidate
    // window.__env.FrontEndURLForCandidateLogin = 'http://111.93.6.98:997/onboarding_test/#/candidate/login';
    // window.__env.baseUrl = '/';
    // window.__env.rootUrl = '/onboarding';
    // window.__env.enableDebug = false;
    // window.__env.idleTime = 2 * 60 * 60;

    /* production performance*/
    // window.__env.apiServerIp = 'hruserperf.askstaffing.com:8900';
    // window.__env.fileServerIp = 'hruserperf.askstaffing.com:8900';
    // window.__env.CandidateAPIURL = 'http://onboardperf.askstaffing.com:8900/onboarding_cob_perf/';
    // window.__env.CandidateDocsURL = 'http://hruserperf.askstaffing.com:8900/onboarding_docs_perf/Candidatedocs/';
    // window.__env.SignedOfferLetterURL = 'http://hruserperf.askstaffing.com:8900/onboarding_docs_perf/Echosign/';
    // window.__env.offerLetterPreview = 'http://hruserperf.askstaffing.com:8900/onboarding_docs_perf/tempDelete/';
    // window.__env.APIURL = 'http://' + window.__env.apiServerIp + '/onboarding_admin_perf/';
    // window.__env.UploadsURL = 'http://' + window.__env.fileServerIp;
    // window.__env.DocsURL = 'http://' + window.__env.fileServerIp + '/onboarding_docs_perf/Docs/';
    // window.__env.NewHireDocsURL = 'http://' + window.__env.fileServerIp + '/onboarding_docs_perf/NewHire/';
    // window.__env.SignImageURL = 'http://' + window.__env.fileServerIp + '/onboarding_docs_perf/Signatures/signature_logo.png';
    // window.__env.EchoDocsURL = 'http://' + window.__env.fileServerIp + '/onboarding_docs_perf/Echosign/';
    // window.__env.ProfilePicURL = 'http://' + window.__env.fileServerIp + '/onboarding_docs_perf/Profilepic/';
    // window.__env.ImagesURL = 'http://' + window.__env.fileServerIp + '/onboarding_docs_perf/Introduction/';
    // window.__env.LogoURL = 'http://' + window.__env.fileServerIp + '/onboarding_docs_perf/Branding/logo/logo_image.';
    // window.__env.BackgroundURL = 'http://' + window.__env.fileServerIp + '/onboarding_docs_perf/Branding/bgimg/bg_image.';
    // window.__env.FrontEndURL = 'http://hruserperf.askstaffing.com:8900/hruser-performance/#/'; //for forgot password email
    // window.__env.FrontEndURLForCandidate = 'http://onboardperf.askstaffing.com:8900/onboarding-performance/#/reset/'; //for forgot password email of candidate
    // window.__env.FrontEndURLForCandidateLogin = 'http://onboardperf.askstaffing.com:8900/onboarding-performance/#/login';
    // window.__env.baseUrl = '/';
    // window.__env.rootUrl = '/hruser-performance';
    // window.__env.enableDebug = false;
    // window.__env.idleTime = 2 * 60 * 60;

    // // **  Production Environment **
    // window.__env.apiServerIp = 'hruser.askstaffing.com:8900';
    // window.__env.fileServerIp = 'hruser.askstaffing.com:8900';
    // window.__env.CandidateAPIURL = 'http://hruser.askstaffing.com:8900/onboarding_cob/';
    // window.__env.CandidateDocsURL = 'http://hruser.askstaffing.com:8900/onboarding_docs/Candidatedocs/';
    // window.__env.SignedOfferLetterURL = 'http://hruser.askstaffing.com:8900/onboarding_docs/Echosign/';
    // window.__env.offerLetterPreview = 'http://hruser.askstaffing.com:8900/onboarding_docs/tempDelete/';
    // window.__env.APIURL = 'http://' + window.__env.apiServerIp + '/onboarding_admin/';
    // window.__env.UploadsURL = 'http://' + window.__env.fileServerIp;
    // window.__env.DocsURL = 'http://' + window.__env.fileServerIp + '/onboarding_docs/Docs/';
    // window.__env.NewHireDocsURL = 'http://' + window.__env.fileServerIp + '/onboarding_docs/NewHire/';
    // window.__env.SignImageURL = 'http://' + window.__env.fileServerIp + '/onboarding_docs/Signatures/signature_logo.png';
    // window.__env.EchoDocsURL = 'http://' + window.__env.fileServerIp + '/onboarding_docs/Echosign/';
    // window.__env.ProfilePicURL = 'http://' + window.__env.fileServerIp + '/onboarding_docs/Profilepic/';
    // window.__env.ImagesURL = 'http://' + window.__env.fileServerIp + '/onboarding_docs/Introduction/';
    // window.__env.LogoURL = 'http://' + window.__env.fileServerIp + '/onboarding_docs/Branding/logo/logo_image.';
    // window.__env.BackgroundURL = 'http://' + window.__env.fileServerIp + '/onboarding_docs/Branding/bgimg/bg_image.';
    // window.__env.FrontEndURL = 'http://hruser.askstaffing.com:8900/hruser/#/'; //for forgot password email
    // window.__env.FrontEndURLForCandidate = 'https://onboard.askstaffing.com/onboarding/#/reset/'; //for forgot password email of candidate
    // window.__env.FrontEndURLForCandidateLogin = 'https://onboard.askstaffing.com/onboarding/#/login';
    // window.__env.baseUrl = '/';
    // window.__env.rootUrl = '/hruser';
    // window.__env.enableDebug = false;
    // window.__env.idleTime = 2 * 60 * 60;
    __env.errorMsgs = {
        "TOKEN_EXPIRED": "Token has Expired",
        "WELCOME": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo",
        'MSG001': "Thanks for Signing Up with our Onboarding system. Our Sales team will be in touch with you soon.",
        'MSG002': "Please enter First Name. It can’t be blank.",
        'MSG003': "Please enter Last Name. It can’t be blank.",
        'MSG004': "Please enter E-Mail ID. It can’t be blank.",
        'MSG005': "Format of the E-mail ID is incorrect. Please enter the valid E-mail ID.",
        'MSG006': "Please enter Phone#. It can’t be blank.",
        'MSG007': "Format of the Phone# is incorrect. Please enter the valid Phone#.",
        'MSG008': "Please select Client Name. It can’t be blank.",
        'MSG009': "The entered e-mail ID is already used for Signup by some other user. Please enter a new e-mail ID.",
        'MSG010': "The entered Phone# is already used for Signup by some other user. Please enter a new Phone#.",
        "MSG011": "Please enter E-Mail ID. It can’t be blank.",
        "MSG012": "Format of the E-mail ID is incorrect. Please enter the valid E-mail ID.",
        "MSG013": "Please enter Password. It can’t be blank.",
        "MSG014": "Format of the Password is incorrect. Please enter the valid Password.",
        "MSG015": "Please enter New Password. It can’t be blank.",
        "MSG016": "Please enter the New Password in correct format for. ",
        "MSG017": "Please enter Confirm New Password. It can’t be blank.",
        "MSG018": "Please enter correct Confirm New Password. It should be same as New Password.",
        "MSG019": "Please enter Template Name. It can’t be blank.",
        "MSG020": "Please select Template Category. It can’t be blank..",
        "MSG021": "Please enter Description. It can’t be blank.",
        "MSG022": "Please enter Subject. It can’t be blank.",
        "MSG023": "Please enter E-mail content. It can’t be blank.",
        "MSG024": "Please enter Task Description. It can’t be blank.",
        "MSG025": "Format of the Task Description is incorrect. Please enter the valid description.",
        "MSG026": "Please enter Task Name. It can’t be blank.",
        "MSG027": "Format of the Task Name is incorrect. Please enter the valid name.",
        "MSG028": "Please assign user. It can’t be blank.",
        "MSG029": "Entered date is not valid",
        "MSG030": "Please select Completion Date. It can’t be blank.",
        "MSG031": "Please select Hire Category. It can’t be blank.",
        "MSG032": "Please select Hire Type. It can’t be blank.",
        "MSG033": "Please enter Candidate First Name. It can’t be blank.",
        "MSG034": "Please enter Candidate Last Name. It can’t be blank.",
        "MSG035": "Please enter E-Mail ID. It can’t be blank.",
        "MSG036": "Format of the E-mail ID is incorrect. Please enter the valid E-mail ID.",
        "MSG037": "Format of the Phone# is incorrect. Please enter the valid Phone#.",
        "MSG038": "Please select Client Name. It can’t be blank.",
        "MSG039": "Please enter Job ID. It can’t be blank.",
        "MSG040": "Please enter Job Title. It can’t be blank.",
        "MSG041": "Please select Tentative Start Date. It can’t be blank.",
        "MSG042": "Please enter Work Location Address. It can’t be blank.",
        "MSG043": "Please enter Account Manager Name. It can’t be blank.",
        "MSG044": "Please enter Account Manager E-Mail ID. It can’t be blank.",
        "MSG045": "Format of the Account Manager E-mail ID is incorrect. Please enter the valid E-mail ID.",
        "MSG046": "Please enter Recruiter Name. It can’t be blank.",
        "MSG047": "Please enter Recruiter E-Mail ID. It can’t be blank.",
        "MSG048": "Format of the Recruiter E-mail ID is incorrect. Please enter the valid E-mail ID.",
        "MSG049": "Please enter Pay Rate. It can’t be blank.",
        "MSG050": "Please enter valid Pay Rate between 1 to 1000",
        "MSG051": "Please enter Bill Rate. It can’t be blank.",
        "MSG052": "Please enter valid Bill Rate between 1 to 1000",
        "MSG053": "Please enter OT Rate. It can’t be blank.",
        "MSG054": "Please enter valid OT Rate between 1 to 1000",
        "MSG055": "Please enter OT Bill Rate. It can’t be blank.",
        "MSG056": "Please enter valid OT Bill Rate between 1 to 1000",
        "MSG057": "Please enter Per Diem Rate. It can’t be blank.",
        "MSG058": "Please enter valid Per Diem Rate between 1 to 1000",
        "MSG059": "Please select Source. It can’t be blank.",
        "MSG060": "This E-mail ID is already used by an existing Candidate. Please enter a new E-mail ID.",
        "MSG061": "With this E-mail ID there is no existing Candidate. Please enter a valid E-mail ID.",
        "MSG062": "The selected Joining date should be at least 7 days ahead of the current date. Please select a new Joining Date.",
        "MSG063": "Please select a Client. It can’t be blank.",
        "MSG064": "Please enter Page Heading. It can’t be blank.",
        "MSG065": "Please enter Page Content. It can’t be blank.",
        "MSG066": "Please upload a Company Logo. It can’t be blank.",
        "MSG067": "Please enter Drug Passport Completion SLA Hrs. It can’t be blank.",
        "MSG068": "The entered Drug Passport Completion SLA Hrs. is NOT numeric. Please enter a valid numeric value.",
        "MSG069": "Please enter I9 Verification Completion SLA Hrs. It can’t be blank.",
        "MSG070": "The entered ‘I9 Verification Completion SLA Hrs.’ is NOT numeric. Please enter a valid numeric value.",
        "MSG071": "Please enter No. of Years of Employment to be verified. It can’t be blank.",
        "MSG072": "Please enter No. of Years Education to be verified. It can’t be blank.",
        "MSG073": "Please enter No. of Years Address to be verified. It can’t be blank.",
        "MSG074": "Please enter No. of References to be Added. It can’t be blank.",
        "MSG075": "Please enter SLA hours for response. It can’t be blank.",
        "MSG076": "Please enter valid SLA Hrs for response.",
        "MSG077": "Please enter SLA hours for process completion. It can’t be blank.",
        "MSG078": "Please enter valid Number of Years to be verfied.",
        "MSG079": "Please enter valid Number of References to be added.",
        "MSG080": "Enter the Onboarding Workflow name. It can’t be blank.",
        "MSG081": "Ensure at least one step is available before submitting the form.",
        "MSG082": "Enter the Step name. It can’t be blank.",
        "MSG083": "Enter the Folder name. It can’t be blank.",
        "MSG084": "Upload atleast one document before submitting the form.",
        "MSG085": "Please enter E-Mail ID. It can’t be blank.",
        "MSG086": "Format of the E-mail ID is incorrect. Please enter the valid E-mail ID.",
        "MSG087": "Please enter E-Mail ID. It can’t be blank.",
        "MSG088": "Format of the E-mail ID is incorrect. Please enter the valid E-mail ID.",
        "MSG089": "Upload at least one document before submitting the form.",
        "MSG090": "Upload at least one document before submitting the form.",
        "MSG091": "Please enter Sub Vendor Name. It can't be blank.",
        "MSG092": "Please enter the valid Sub Vendor Name",
        "MSG093": "Please enter Sub Vendor Email. It can't be blank.",
        "MSG094": "Please enter the valid Sub Vendor Email.",
        "MSG095": "Please enter the valid Candidate First Name.",
        "MSG096": "Please enter the valid Candidate Last Name.",
        "MSG097": "Please enter the valid Job Id.",
        "MSG098": "Please enter the valid Account Manager Name.",
        "MSG099": "Please enter the valid Recruiter Name.",
        "MSG100": "Please enter valid number between 1 to 1000",
        "MSG101": "Please enter valid SLA Hrs for process completion.",
        "MSG102": "Please enter valid Template name.",
        'MSG103': "Please enter the valid First Name.",
        'MSG104': "Please enter the valid Last Name.",
        'MSG105': "Please select Company size. It can't be blank.",
        'MSG106': "Please select Company location. It can't be blank.",
        "MSG107": "Enter the Step description. It can’t be blank.",
        "MSG108": "Special chars are not allowed.",
        "MSG109": "Please enter the valid First Name.",
        "MSG110": "Please enter the valid Last Name.",
        "MSG111": "Enter the Document Display Name. It can't be blank.",
        "MSG112": "Please enter valid Template Description.",
        "MSG113": "Please enter valid Template Subject.",
        "MSG114": "Please enter valid Step name.",
        "MSG115": "Please enter valid Step description.",
        "MSG116": "System idle for too long. Session has been timed-out!",
        "MSG117": "Email Id already in use. Please use another email.",
        "MSG118": "Workflow needs to have atleast one step with document(s).",
        "MSG119": "Complete new step creation or cancel it, before saving workflow.",
        "MSG120": "Format of the Workflow name is incorrect.",
        "MSG121": "A step needs to have atleast one document.",
        "MSG122": "Please provide a valid Template body with no images.",
        "MSG123": "Please provide a valid Template body",
        "MSG124": "Incomplete data provided. Please fill mandatory fields.",
        "MSG125": "Email Template cannot be more than 2,000 characters length.",
        "MSG126": "Offer Letter Email Template cannot be more than 10,000 characters length.",
        "MSG127": "Fill all the mandatory fields",
        "MSG128": "Please fill all the mandatory fields",
        "MSG129": "Please fill all the mandatory fields with valid format.",
        "MSG130": "ERROR: Unable to get data",
        "MSG131": "ERROR: Unable to save data",
        "MSG132": "ERROR: Could not get States list.",
        "MSG133": "Fill required fields",
        "MSG134": "ERROR: End date should be after Start Date.",
        "MSG135": "ERROR: End Date cannot be before Start Date.",
        "MSG136": "ERROR: Completed date cannot be before End Date.",
        "MSG137": "ERROR: Get Offer Letter.",
        "MSG138": "ERROR: Could not get Cities list.",
        "MSG139": "Error occured while getting data of Contractor Information",
        "MSG140": "Error occured while editing data of EEO",
        "MSG141": "Error occured while adding data of EEO",
        "MSG142": "Error occured while getting data of EEO",
        "MSG143": "ERROR: Could not upload the document.",
        "MSG144": "ERROR: Could not delete the document.",
        "MSG145": "ERROR: Get Offer Letter.",
        "MSG146": "An error occurred while Updating",
        "MSG147": "ERROR: Get Echosign Url error.",
        "MSG148": "Please enter comments.",
        "MSG149": "Please upload file.",
        "MSG150": "Nothing to submit.",
        "MSG151": "File size cannot be more than 10 MB",
        "MSG152": "ERROR: Resending Password failed.",
        "MSG153": "Confirm Password should match with the new Password given.",
        "MSG154": "ERROR: Could not get Tasks list.",
        "MSG155": "Required values are not provided.",
        "MSG156": "Something went seriously wrong! Could not sign you in.",
        "MSG157": "Unable to preview your offer letter. Please try again after some time.",
        "MSG158": "An error occurred while Sign Up",
        "MSG159": "ERROR: Could not get New Hires list.",
        "MSG160": "ERROR: Could not get new hire status list.",
        "MSG161": "ERROR: Could not get Clients list.",
        "MSG162": "ERROR: Could not get HR Users list.",
        "MSG163": "ERROR: Could not get recent activities list.",
        "MSG164": "ERROR: Could not get Onboardings list.",
        "MSG165": "Please enter all fields",
        "MSG166": "Email cannot be more than 1000 characters length.",
        "MSG167": "Tentative Start date should be at least two days higher than current date",
        "MSG168": "[Signature] placeholder is mandatory for Offer Letter",
        "MSG169": "[Signature] placeholder should not be more than one",
        "MSG170": "Payroll and EEO Web Forms are required for W2 hire",
        "MSG171": "Contractor Web Form is not required for W2 hire",
        "MSG172": "Contractor Web Form is required for C2C/1099 hire",
        "MSG173": "Payroll and EEO Web Forms are not required for C2C/1099 hire",
        "MSG174": "The selected workflow doesnot match with the new hire category",
        "MSG175": "At least One document in the Initiate Onboarding work flow requires HR approval.",
        "MSG176": "EEO Web Form and Its documents are not matched in the selection",
        "MSG177": "Payroll Web Form and Its documents are not matched in the selection",
        "MSG178": "Contractor Web Form and Its documents are not matched in the selection",
        "MSG179": "Background Verirfication Web Form and Its documents are not matched in the selection",
        "MSG180": "ERROR: Could not get folders list for new Workflow.",
        "MSG181": "Workflow needs atleast one step.",
        "MSG182": "An error occurred while Updating new hire status",
        "MSG183": "Please approve all documents for this step to complete",
        "MSG184": "An error occurred creating schedule",
        "MSG185": "ERROR: Could not get New Hires status list.",
        "MSG186": "ERROR: Get Common Details.",
        "MSG187": "Something went seriously wrong! Could not log you out.",
        "MSG188": "Please enter OT Bill Rate. It cant be blank",
        "MSG189": "Please enter OT Pay Rate. It cant be blank",
        "MSG190": "ERROR: Tentative End date should be after Tentative Start Date.",
        "MSG191": "ERROR: Couldnot update New Hire",
        "MSG192": "ERROR: Couldnot add New Hire",
        "MSG193": "Email Id already in use. Please use another.",
        "MSG194": "ERROR: Could not validate email Id given.",
        "MSG195": "Incomplete data provided. Please enter mandatory fields.",
        "MSG196": "ERROR: Could not send email to the new hire.",
        "MSG197": "Duration of the report should not be more than one year",
        "MSG198": "ERROR: Could not save branding colors.",
        "MSG199": "ERROR: Could not delete folder.",
        "MSG200": "ERROR: Could not get Document Association details.",
        "MSG201": "ERROR: Could not get Doc Library list.",
        "MSG202": "ERROR: Could not get the Doc Library data.",
        "MSG203": "To change the settings, Please remove the mapping of this document with the folder and continue",
        "MSG204": "ERROR: Could not edit the document.",
        "MSG205": "ERROR: Could not get the base64 data of document.",
        "MSG206": "ERROR: Could not retrieve template category list.",
        "MSG207": "ERROR: Could not get the email template data.",
        "MSG208": "ERROR: Could not add New HR User",
        "MSG209": "File size cannot be more than 1MB",
        "MSG210": "[Signature] placeholder is mandatory for Offer Letter",
        "MSG211": "[Signature] placeholder should not be more than one",
        "MSG212": "ERROR: Could not edit email template data.",
        "MSG213": "ERROR: Could not add email template.",
        "MSG214": "ERROR: Could not retrieve email template list.",
        "MSG215": "ERROR: Could not delete email template.",
        "MSG216": "ERROR: Could not submit mapping details.",
        "MSG217": "ERROR: Could not get the folder data.",
        "MSG218": "ERROR: Could not add New Folder.",
        "MSG219": "ERROR: Could not retrieve folder list.",
        "MSG220": "Error occured while retrieving data of General Settings",
        "MSG221": "Error occured while adding data of General Settings",
        "MSG222": "ERROR: Could not get permissions master list.",
        "MSG223": "ERROR: Could not get the HR user data to edit.",
        "MSG224": "ERROR: Incomplete HR User data given. Please try again.",
        "MSG225": "ERROR: Could not edit HR user data.",
        "MSG226": "ERROR: Could not delete user.",
        "MSG227": "ERROR: Could not get events list.",
        "MSG228": "ERROR: Could not get Task Status list.",
        "MSG229": "ERROR: Could not get the HR user list.",
        "MSG230": "ERROR: Could not add New Task.",
        "MSG231": "Please select AssignedTo. It can't be blank.",
        "MSG232": "ERROR: Could not edit Task.",
        "MSG233": "ERROR: Could not get task data.",
        "MSG234": "Incomplete data provided. Please fill the required fields.",
        "MSG235": "ERROR: Could not delete task.",
        "MSG236": "ERROR: Password reset token validation failed.",
        "MSG237": "ERROR: Password reset failed.",
        "MSG238": "Something went seriously wrong! Could not force your log in.",
        "MSG239": "Error occured while retrieving data of Countries",
        "MSG240": "Error occured while retrieving data of Company Size",
        "MSG241": "ERROR: Could not get Workflow data.",
        "MSG242": "Please enter Step Name. It can't be blank.",
        "MSG243": "Please enter Step Description. It can't be blank.",
        "MSG244": "ERROR: Could not add Workflow.",
        "MSG245": "ERROR: Could not get folders list for editing Workflow.",
        "MSG246": "ERROR: Could not get Workflow list.",
        "MSG247": "ERROR: Could not delete workflow.",
        "MSG248": "File size cannot be more than 500kB",
        "MSG249": "ERROR: Could not get mapping details.",
        "MSG250": "ERROR: Could not get common fields.",
        "MSG251": "ERROR: Could not get document fields mapping data.",
        "MSG252": "Atleast map the document with one common field",
        "MSG253": "Please select Tentative End Date. It can’t be blank.",
        "MSG254": "Entered date is not valid",
        "MSG255": "Please enter Client City. It can’t be blank.",
        "MSG256": "Format of the Client City is incorrect. Please enter the valid Client City.",
        "MSG257": "Please enter Client Street Address. It can’t be blank.",
        "MSG258": "Please enter City. It can’t be blank.",
        "MSG259": "Please enter Client State. It can’t be blank.",
        "MSG260": "Please enter State. It can’t be blank.",
        "MSG261": "Bill Rate should be greater than Pay Rate",
        "MSG262": "OT Pay Rate should be greater than Pay Rate",
        "MSG263": "OT Bill Rate should be greater than OT Pay Rate",
        "MSG264": "Error occured while adding data of Payroll Package Form",
        "MSG265": "Error occured while editing data of Payroll Package Form",
        "MSG266": "Error occured while getting data of Payroll Package Form",
        "MSG267": "Error occured while adding data of Contractor Information",
        "MSG268": "Error occured while editing data of Contractor Information",
        "MSG269": "File size cannot be more than 20 MB",
        "MSG270": "Please enter Reason For Rejection. It can’t be blank.",
        "MSG271": "Please enter Other Reason. It can’t be blank.",
        "MSG272": "Comments for rejection cannot be more than 2000 characters length.",
        "MSG273": "Please enter the valid Other Reason.",
        "MSG274": "Please enter Double Time Rate. It cant be blank",
        "MSG275": "Please enter Double Time Bill Rate. It cant be blank",
        "MSG276": "Double Time Rate should be greater than Pay Rate",
        "MSG277": "Double Time Bill Rate should be greater than Double Time Rate",
        "MSG278": "Please select Reason For Stop Onboarding. It can’t be blank."

    };
    // window.__env.errors = [
    //     { "id": "MOD-SIGNUP", "message": "SIGN UP" },
    //     { "id": "MSG001", "source": "FS", "message": "Thanks for Signing Up with our Onboarding system. Our Sales team will be in touch with you soon." },
    //     { "id": "MSG002", "source": "FS", "message": "Please enter First Name. It can’t be blank." },
    //     { "id": "MSG003", "source": "FS", "message": "Please enter Last Name. It can’t be blank." },
    //     { "id": "MSG004", "source": "FS", "message": "Please enter E-Mail ID. It can’t be blank." },
    //     { "id": "MSG005", "source": "FS", "message": "Format of the E-mail ID is incorrect. Please enter the valid E-mail ID." },
    //     { "id": "MSG006", "source": "FS", "message": "Please enter Phone#. It can’t be blank." },
    //     { "id": "MSG007", "source": "FS", "message": "Format of the Phone# is incorrect. Please enter the valid Phone#." },
    //     { "id": "MSG008", "source": "GENERIC", "message": "Please select Client Name. It can’t be blank." },
    //     { "id": "MSG009", "source": "FS", "message": "The entered e-mail ID is already used for Signup by some other user. Please enter a new e-mail ID." },
    //     { "id": "MSG010", "source": "FS", "message": "The entered Phone# is already used for Signup by some other user. Please enter a new Phone#." },
    //     { "id": "MSG103", "source": "GENERIC", "message": "Please enter the valid First Name." },
    //     { "id": "MSG104", "source": "GENERIC", "message": "Please enter the valid Last Name." },
    //     { "id": "MSG105", "source": "GENERIC", "message": "Please select Company size. It can't be blank." },
    //     { "id": "MSG106", "source": "GENERIC", "message": "Please select Company location. It can't be blank." },

    //     { "id": "MOD-LOGIN", "message": "LOGIN" },
    //     { "id": "TOKEN_EXPIRED", "source": "GENERIC", "message": "Token has Expired" },
    //     { "id": "MSG011", "source": "FS", "message": "Please enter E-Mail ID. It can’t be blank." },
    //     { "id": "MSG012", "source": "FS", "message": "Format of the E-mail ID is incorrect. Please enter the valid E-mail ID." },
    //     { "id": "MSG013", "source": "FS", "message": "Please enter Password. It can’t be blank." },
    //     { "id": "MSG014", "source": "FS", "message": "Format of the Password is incorrect. Please enter the valid Password." },
    //     { "id": "WELCOME", "source": "FS", "message": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo" },
    //     { "id": "MSG015", "source": "FS", "message": "Please enter New Password. It can’t be blank." },
    //     { "id": "MSG016", "source": "FS", "message": "Please enter the New Password in correct format for. " },
    //     { "id": "MSG017", "source": "FS", "message": "Please enter Confirm New Password. It can’t be blank." },
    //     { "id": "MSG018", "source": "FS", "message": "Please enter correct Confirm New Password. It should be same as New Password." },
    //     { "id": "MSG116", "source": "GENERIC", "message": "System idle for too long. Session has been timed-out!" },


    //     { "id": "MOD-EMAILTEMPLATES", "message": "EMAIL TEMPLATES" },
    //     { "id": "MSG019", "source": "FS", "message": "Please enter Template Name. It can’t be blank." },
    //     { "id": "MSG020", "source": "FS", "message": "Please select Template Category. It can’t be blank.." },
    //     { "id": "MSG021", "source": "GENERIC", "message": "Please enter Description. It can’t be blank." },
    //     { "id": "MSG022", "source": "FS", "message": "Please enter Subject. It can’t be blank." },
    //     { "id": "MSG023", "source": "FS", "message": "Please enter E-mail content. It can’t be blank." },
    //     { "id": "MSG102", "source": "GENERIC", "message": "Please enter valid Template name." },
    //     { "id": "MSG112", "source": "GENERIC", "message": "Please enter valid Template Description." },
    //     { "id": "MSG113", "source": "GENERIC", "message": "Please enter valid Template Subject." },

    //     { "id": "MOD-TASKS", "message": "TASKS" },
    //     { "id": "MSG024", "source": "FS", "message": "Please enter Task Description. It can’t be blank." },
    //     { "id": "MSG025", "source": "FS", "message": "Format of the Task Description is incorrect. Please enter the valid description." },
    //     { "id": "MSG026", "source": "FS", "message": "Please enter Task Name. It can’t be blank." },
    //     { "id": "MSG027", "source": "FS", "message": "Format of the Task Name is incorrect. Please enter the valid name." },
    //     { "id": "MSG028", "source": "FS", "message": "Please assign user. It can’t be blank." },
    //     { "id": "MSG029", "source": "FS", "message": "Entered date is not valid" },
    //     { "id": "MSG030", "source": "FS", "message": "Please select Completion Date. It can’t be blank." },

    //     { "id": "MOD-NEWHIRES", "message": "NEW HIRES" },
    //     { "id": "MSG031", "source": "FS", "message": "Please select Hire Category. It can’t be blank." },
    //     { "id": "MSG032", "source": "FS", "message": "Please select Hire Type. It can’t be blank." },
    //     { "id": "MSG033", "source": "FS", "message": "Please enter Candidate First Name. It can’t be blank." },
    //     { "id": "MSG034", "source": "FS", "message": "Please enter Candidate Last Name. It can’t be blank." },
    //     { "id": "MSG035", "source": "FS", "message": "Please enter E-Mail ID. It can’t be blank." },
    //     { "id": "MSG036", "source": "FS", "message": "Format of the E-mail ID is incorrect. Please enter the valid E-mail ID." },
    //     { "id": "MSG037", "source": "FS", "message": "Format of the Phone# is incorrect. Please enter the valid Phone#." },
    //     { "id": "MSG038", "source": "GENERIC", "message": "Please select Client Name. It can’t be blank." },
    //     { "id": "MSG039", "source": "FS", "message": "Please enter Job ID. It can’t be blank." },
    //     { "id": "MSG040", "source": "FS", "message": "Please enter Job Title. It can’t be blank." },
    //     { "id": "MSG041", "source": "FS", "message": "Please select Tentative Start Date. It can’t be blank." },
    //     { "id": "MSG042", "source": "FS", "message": "Please enter Work Location Address. It can’t be blank." },
    //     { "id": "MSG043", "source": "FS", "message": "Please enter Account Manager Name. It can’t be blank." },
    //     { "id": "MSG044", "source": "FS", "message": "Please enter Account Manager E-Mail ID. It can’t be blank." },
    //     { "id": "MSG045", "source": "FS", "message": "Format of the Account Manager E-mail ID is incorrect. Please enter the valid E-mail ID." },
    //     { "id": "MSG046", "source": "FS", "message": "Please enter Recruiter Name. It can’t be blank." },
    //     { "id": "MSG047", "source": "FS", "message": "Please enter Recruiter E-Mail ID. It can’t be blank." },
    //     { "id": "MSG048", "source": "FS", "message": "Format of the Recruiter E-mail ID is incorrect. Please enter the valid E-mail ID." },
    //     { "id": "MSG049", "source": "FS", "message": "Please enter Pay Rate. It can’t be blank." },
    //     { "id": "MSG050", "source": "GENERIC", "message": "Please enter valid Pay Rate between 1 to 1000" },
    //     { "id": "MSG051", "source": "FS", "message": "Please enter Bill Rate. It can’t be blank." },
    //     { "id": "MSG052", "source": "GENERIC", "message": "Please enter valid Bill Rate between 1 to 1000" },
    //     { "id": "MSG053", "source": "FS", "message": "Please enter OT Rate. It can’t be blank." },
    //     { "id": "MSG054", "source": "GENERIC", "message": "Please enter valid OT Rate between 1 to 1000" },
    //     { "id": "MSG055", "source": "FS", "message": "Please enter OT Bill Rate. It can’t be blank." },
    //     { "id": "MSG056", "source": "GENERIC", "message": "Please enter valid OT Bill Rate between 1 to 1000" },
    //     { "id": "MSG057", "source": "FS", "message": "Please enter Per Diem Rate. It can’t be blank." },
    //     { "id": "MSG058", "source": "GENERIC", "message": "Please enter valid Per Diem Rate between 1 to 1000" },
    //     { "id": "MSG059", "source": "FS", "message": "Please select Source. It can’t be blank." },
    //     { "id": "MSG060", "source": "FS", "message": "This E-mail ID is already used by an existing Candidate. Please enter a new E-mail ID." },
    //     { "id": "MSG061", "source": "FS", "message": "With this E-mail ID there is no existing Candidate. Please enter a valid E-mail ID." },
    //     { "id": "MSG062", "source": "FS", "message": "The selected Joining date should be at least 7 days ahead of the current date. Please select a new Joining Date." },
    //     { "id": "MSG091", "source": "GENERIC", "message": "Please enter Sub Vendor Name. It can't be blank." },
    //     { "id": "MSG092", "source": "GENERIC", "message": "Please enter the valid Sub Vendor Name" },
    //     { "id": "MSG093", "source": "GENERIC", "message": "Please enter Sub Vendor Email. It can't be blank." },
    //     { "id": "MSG094", "source": "GENERIC", "message": "Please enter the valid Sub Vendor Email." },
    //     { "id": "MSG095", "source": "GENERIC", "message": "Please enter the valid Candidate First Name." },
    //     { "id": "MSG096", "source": "GENERIC", "message": "Please enter the valid Candidate Last Name." },
    //     { "id": "MSG097", "source": "GENERIC", "message": "Please enter the valid Job Id." },
    //     { "id": "MSG098", "source": "GENERIC", "message": "Please enter the valid Account Manager Name." },
    //     { "id": "MSG099", "source": "GENERIC", "message": "Please enter the valid Recruiter Name." },
    //     { "id": "MSG100", "source": "GENERIC", "message": "Please enter valid number between 1 to 1000" },

    //     { "id": "MOD-INTROPAGE", "message": "INTRO PAGE" },
    //     { "id": "MSG063", "source": "FS", "message": "Please select a Client. It can’t be blank." },
    //     { "id": "MSG064", "source": "FS", "message": "Please enter Page Heading. It can’t be blank." },
    //     { "id": "MSG065", "source": "FS", "message": "Please enter Page Content. It can’t be blank." },
    //     { "id": "MSG066", "source": "GENERIC", "message": "Please upload a Company Logo. It can’t be blank." },

    //     { "id": "MOD-GENERALSETTINGS", "message": "GENERAL SETTINGS" },
    //     { "id": "MSG067", "source": "FS", "message": "Please enter Drug Passport Completion SLA Hrs. It can’t be blank." },
    //     { "id": "MSG068", "source": "FS", "message": "The entered Drug Passport Completion SLA Hrs. is NOT numeric. Please enter a valid numeric value." },
    //     { "id": "MSG069", "source": "FS", "message": "Please enter I9 Verification Completion SLA Hrs. It can’t be blank." },
    //     { "id": "MSG070", "source": "FS", "message": "The entered ‘I9 Verification Completion SLA Hrs.’ is NOT numeric. Please enter a valid numeric value." },
    //     { "id": "MSG071", "source": "FS", "message": "Please enter No. of Years of Employment to be verified. It can’t be blank." },
    //     { "id": "MSG072", "source": "FS", "message": "Please enter No. of Years Education to be verified. It can’t be blank." },
    //     { "id": "MSG073", "source": "FS", "message": "Please enter No. of Years Address to be verified. It can’t be blank." },
    //     { "id": "MSG074", "source": "FS", "message": "Please enter No. of References to be Added. It can’t be blank." },
    //     { "id": "MSG075", "source": "GENERIC", "message": "Please enter SLA hours for response. It can’t be blank." },
    //     { "id": "MSG076", "source": "GENERIC", "message": "Please enter valid SLA Hrs for response." },
    //     { "id": "MSG077", "source": "GENERIC", "message": "Please enter SLA hours for process completion. It can’t be blank." },
    //     { "id": "MSG078", "source": "GENERIC", "message": "Please enter valid Number of Years to be verfied." },
    //     { "id": "MSG079", "source": "GENERIC", "message": "Please enter valid Number of References to be added." },
    //     { "id": "MSG101", "source": "GENERIC", "message": "Please enter valid SLA Hrs for process completion." },

    //     { "id": "MOD-WORKFLOWS", "message": "WORKFLOWS" },
    //     { "id": "MSG080", "source": "FS", "message": "Enter the Onboarding Workflow name. It can’t be blank." },
    //     { "id": "MSG120", "source": "GENERIC", "message": "Format of the Workflow name is incorrect." },
    //     { "id": "MSG081", "source": "FS", "message": "Ensure at least one step is available before submitting the form." },
    //     { "id": "MSG082", "source": "FS", "message": "Enter the Step name. It can’t be blank." },
    //     { "id": "MSG107", "source": "GENERIC", "message": "Enter the Step description. It can’t be blank." },
    //     { "id": "MSG114", "source": "GENERIC", "message": "Please enter valid Step name." },
    //     { "id": "MSG115", "source": "GENERIC", "message": "Please enter valid Step description." },
    //     { "id": "MSG118", "source": "GENERIC", "message": "Workflow needs to have atleast one step with document(s)." },
    //     { "id": "MSG119", "source": "GENERIC", "message": "Complete new step creation or cancel it, before saving workflow." },

    //     { "id": "MOD-FOLDERS", "message": "FOLDERS" },
    //     { "id": "MSG083", "source": "FS", "message": "Enter the Folder name. It can’t be blank." },
    //     { "id": "MSG084", "source": "FS", "message": "Upload atleast one document before submitting the form." },
    //     { "id": "MSG108", "source": "GENERIC", "message": "Special chars are not allowed." },

    //     { "id": "MOD-USERS", "message": "USERS" },
    //     { "id": "MSG085", "source": "FS", "message": "Please enter E-Mail ID. It can’t be blank." },
    //     { "id": "MSG086", "source": "FS", "message": "Format of the E-mail ID is incorrect. Please enter the valid E-mail ID." },
    //     { "id": "MSG087", "source": "FS", "message": "Please enter E-Mail ID. It can’t be blank." },
    //     { "id": "MSG088", "source": "FS", "message": "Format of the E-mail ID is incorrect. Please enter the valid E-mail ID." },
    //     { "id": "MSG109", "source": "GENERIC", "message": "Please enter the valid First Name." },
    //     { "id": "MSG110", "source": "GENERIC", "message": "Please enter the valid Last Name." },
    //     { "id": "MSG117", "source": "GENERIC", "message": "Email Id already in use. Please use another email." },

    //     { "id": "MOD-DOCUMENTS", "message": "DOCUMENTS" },
    //     { "id": "MSG089", "source": "FS", "message": "Upload at least one document before submitting the form." },
    //     { "id": "MSG090", "source": "FS", "message": "Upload at least one document before submitting the form." },
    //     { "id": "MSG111", "source": "GENERIC", "message": "Enter the Document Display Name. It can't be blank." }

    // ];

}(this));