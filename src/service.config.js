// const SERVERURL = 'http://192.168.0.108:8080/';

const SERVERURL = 'http://localhost:8082/';
const URL={
    login:SERVERURL + 'login',
    register:SERVERURL + 'register',
    getinfo:SERVERURL + 'empinfo',
    getdep:SERVERURL + 'departname',
    adddep:SERVERURL + 'adddepartment',
    deldepartment:SERVERURL + 'deldepartment',
    updatedep:SERVERURL + 'updatadepartment',
    updetainfo:SERVERURL + 'updatampinfo',
    delempinfo:SERVERURL + 'delempinfo',
    getDepartInfo:SERVERURL+ 'departname'+ "/empinfo",
}

export default URL;