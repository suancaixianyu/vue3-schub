interface memberItem{
    id:number
    account:string
    nickname:string
    reg_time:number
    last_login_time:number
    last_login_ip:string
    money:number
    email:string
}
interface modItem{
    id:number
    name:string
    description:string
    user_name:string
    uid:number
    stat:number
}
interface roleItem{
    id:string
    name:string
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