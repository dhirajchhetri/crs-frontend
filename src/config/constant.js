export const BASENAME = ''; // don't add '/' at end off BASENAME
export const BASE_URL = '/app/dashboard/default';
export const BASE_TITLE = ' | CRS ';
export const API_SERVER = 'http://localhost:9000/v0';
export const  colors =['#ff8a65','#f4c22b','#04a9f5','#3ebfea','#4F5467','#1de9b6','#a389d4','#FE8A7D'];

export const CONFIG = {
    layout: 'vertical', // disable on free version
    subLayout: '', // disable on free version
    collapseMenu: true, // mini-menu
    layoutType: 'menu-dark', // disable on free version
    navIconColor: false, // disable on free version
    headerBackColor: 'header-default', // disable on free version
    navBackColor: 'navbar-default', // disable on free version
    navBrandColor: 'brand-default', // disable on free version
    navBackImage: false, // disable on free version
    rtlLayout: false, // disable on free version
    navFixedLayout: true, // disable on free version
    headerFixedLayout: false, // disable on free version
    boxLayout: false, // disable on free version
    navDropdownIcon: 'style1', // disable on free version
    navListIcon: 'style1', // disable on free version
    navActiveListColor: 'active-default', // disable on free version
    navListTitleColor: 'title-default', // disable on free version
    navListTitleHide: false, // disable on free version
    configBlock: true, // disable on free version
    layout6Background: 'linear-gradient(to right, #A445B2 0%, #D41872 52%, #FF0066 100%)', // disable on free version
    layout6BackSize: '' // disable on free version
};


export const GraphType={
    PieDonutChart: 'pie-donut',
    PieBasicChart:'pie-chart-basic',
    BarDiscreteChart:'basic-discrete-chart',
    MultiBarChart:'multi-bar-chart',
    LineChart: 'line-chart'

}

export const Quarters=[
    {label:'Q1', value:1},
    {label:'Q2', value:2},
    {label:'Q3', value:3},
    {label:'Q4', value:4}
]

export const dashboardChartDisplayText ={
    chart0:`This chart shows the segregation of registered participants through ReCoVER program in which “Yes”
    indicates those participants who have been enrolled eariler and “Inclusion ” indicates those
    participants who were enrolled later.`,
    chart1:`This chart shows the segregation of registered participants through ReCoVER program in which “Yes”
    indicates those participants who have been enrolled eariler and “Inclusion ” indicates those
    participants who were enrolled later.`,
    chart2:`This chart shows the segregation of registered participants through ReCoVER program in which “Yes”
    indicates those participants who have been enrolled eariler and “Inclusion ” indicates those
    participants who were enrolled later.`,
    chart3:`This chart shows the segregation of registered participants through ReCoVER program in which “Yes”
    indicates those participants who have been enrolled eariler and “Inclusion ” indicates those
    participants who were enrolled later.`,
    chart4:`This chart shows the segregation of registered participants through ReCoVER program in which “Yes”
    indicates those participants who have been enrolled eariler and “Inclusion ” indicates those
    participants who were enrolled later.`,
    chart5:`This chart shows the segregation of registered participants through ReCoVER program in which “Yes”
    indicates those participants who have been enrolled eariler and “Inclusion ” indicates those
    participants who were enrolled later.`,
    chart6:`This chart shows the segregation of registered participants through ReCoVER program in which “Yes”
    indicates those participants who have been enrolled eariler and “Inclusion ” indicates those
    participants who were enrolled later.`,
    chart7:`This chart shows the segregation of registered participants through ReCoVER program in which “Yes”
    indicates those participants who have been enrolled eariler and “Inclusion ” indicates those
    participants who were enrolled later.`,
    chart8:`This chart shows the segregation of registered participants through ReCoVER program in which “Yes”
    indicates those participants who have been enrolled eariler and “Inclusion ” indicates those
    participants who were enrolled later.`,
}


export const sectors=[
{label:'Shelter', value:'shelter'},
{label:'Livelihood', value:'livelihood'},
{label:'Water Infrastructure', value:'waterInfrastructure'},
{label:'DRR', value:'drr'},

]

export const performanceIndicators=[
{label:"Top-up Support", value:"top-up-support", sector:"shelter"},
{label:"MLT Support", value:"mlt-support" , sector:"shelter"},
{label:"LCH Support" , value:"lch-support" , sector:"shelter"},
{label:"Tecnhical Assistance" , value:"technical-assistance",sector:"shelter"},
{label:"Skill-building Training" ,value:"skill-building-training",sector:"livelihood"},
{label:"Materials Inputs" , value:"material-inputs",sector:"livelihood"}

]