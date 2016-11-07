interface AuthConfiguration {
    clientID: string,
    domain: string
}

export const myConfig: AuthConfiguration = {
    clientID: 'YourAuth0Key',
    domain: 'YourAuth0Domain.auth0.com'
};
