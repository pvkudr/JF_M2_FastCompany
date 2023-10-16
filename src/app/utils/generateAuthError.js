export function generateAuthError(message) {
    switch (message) {
        case 'INVALID_PASSWORD':
            return 'Invalid password.';
        case 'EMAIL_NOT_FOUND':
            return 'User is not exist. Please go to sign up section.';
        case 'INVALID_EMAIL':
            return 'Invalid email.';
        default:
            return 'Some mistake, try later.';
    }
}
