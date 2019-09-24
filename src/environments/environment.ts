// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
    production: false,
    theme: 'black',
    blackThemeBrandColor: '#0AADC8',
    blackThemePieChartTrackColor: '#252c32',

    blueThemeBrandColor: '#252c32',
    blueThemePieChartTrackColor: '#eeeeee',
    serverUrl: 'http://ec2-3-15-116-184.us-east-2.compute.amazonaws.com:9090/cybernetix',
    kibanaLink: 'http://ec2-3-15-116-184.us-east-2.compute.amazonaws.com:5601'
};
