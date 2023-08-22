interface memberItem{
    id:number
    account:string
    nickname:string
    reg_time:number
    last_login_time:number
    last_login_ip:string
    money:number
    stat:number
    email:string
}
interface modItem{
    id:number
    name:string
    description:string
    user_name:string
    uid:number
    stat:number
    reason:string
}
interface roleItem{
    id:string
    name:string
    stat:number
}
interface bbsItem{
    id:number
    title:string
    stat:number
}
interface siteConfig{
    id:number
    name:string
    value:string
    comments:string
}
interface siteSaveConfig{
    id:number
    value:string
}
interface res{
    code:number
    msg:string
    data:any
    sum:number
}
interface serverInfo{
    member:number
    bbs:number
    mod:number
}