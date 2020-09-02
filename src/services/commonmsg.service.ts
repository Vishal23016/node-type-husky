class CommonMessageService {
    
    common = {
        error: {
			someThingWentWrong: "Something Went Wrong.",
			schemaNotFound: 'Schema not found.',
            detailNotFound: "Detail Not Found.",
			notAccessGranted: "You don't have access of api."
        },
        success: {
            thirdPartyResponse: 'Third party success message.',
            accessGranted: "Access granted.",
            success:"success"
        }
    }

    auth = {
        error: {
            loginSuccessfully: "User login successfully.",
			registeredSuccessfully: "User registered successfully.",
			otpSent: "verification code sent in email.",
			otpReSent: "verification code sent in email.",
        },
        success: {
            loginError: "login error.",
			passwordError: "password not match.",
			reigsterError: "register error.",
			otpError: "invalid otp and email.",
			otpExprire: "your otp expire.",
			inValidUser: 'Please provide valid username and password.',
			userNotFound: "User not found."
        }
    }

    find = {
        error: {
            findErr : "data not found"
        },
        success: {
            find : "data find successfully"
        }
    }

    update = {
        error: {
            updateErr : "data not update"
        },
        success: {
            update : "data update successfully"
        }
    }

    delete = {
        error: {
            deleteErr : "data not found"
        },
        success: {
            delete : "data delete successfully"
        }
    }
}

export default CommonMessageService