# JIRA issue reorganizer

## Info

### base techs used,

> php with shell_exec  function enabled

> curl for cli

### setup
> v0.1

create a file with a info.ini 

    curl -X GET -H "Authorization: Basic dXNlcjpwYXNzd29yZA==" -H "Content-Type: application/json" "https://yourOrgDomain.atlassian.net/rest/api/2/search?various=parameters"

in tmgdigitalscase

    curl -X GET -H "Authorization: Basic dXNlcjpwYXNzd29yZA==" -H "Content-Type: application/json" "https://tmgdigital.atlassian.net/rest/api/2/search?RapidViewId=2&jql=(issuetype!=Sub-task%20AND%20issuetype!=Epic)%20AND%20(status!=done%20AND%20status!=10600)%20AND%20project%20in%20(TD,%20HL,%20ST,%20BMM,%20ADF,%20ADOPS,%20BDTV,%20BLAC,%20BOOK,%20DB,%20BSS,%20BUS,%20CR,%20COS,%20DIS,%20DS,%20FM,%20HEL,%20HR,%20IG,%20%22IN%22,%20ISS,%20MAG,%20MAR,%20MIMS,%20NEW,%20RDM,%20RED,%20SHO,%20SW,%20SC,%20STDE,%20TOP,%20SWSOC,%20EM,%20FMSA,%20HC,%20STGN,%20TS,%20TL,%20TMF,%20WAN)%20ORDER%20BY%20Rank%20ASC"

the basic authentication is the base64 encoding of 
    
>> "user:password" =>  dXNlcjpwYXNzd29yZA==

### using the app

issuetypes are defined primarily into 2, Tasks and SubTasks.

additional filter include Progress Statuses

>>> To do ` excludes tasks onhold `
>>> In Progress
>>> QA

these can be configured in the data object - ` data.tags `
colors of task priority can also be configured in ` data.color `

the input textbox ` starting point ` changes the index of the task

and input textbox ` ending point ` changes the amount of tasks to be displayed

#### printing tasks and subtasks

> Settings

##### subtasks 

> to be able print 10 subtasks per page on an A4 in PORTRAIT ` google chrome ` page must be scaled to 146,
> to be able print 12 subtasks per page on an A4 PORTRAIT in ` google chrome ` page must be scaled to 122,

    > no margins or minimum margins set

##### tasks

> to be able print 6 tasks per page on an A4 LANDSCAPE in ` mozilla firefox ` page must be scaled to 122%,
