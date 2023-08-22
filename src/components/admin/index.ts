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
    stat_data:any
    create_time:number
    create_time_str:string
    downloads:number
    downloads_num:string
    views:number
    views_num:string
    likes:number
    likes_num:string
    cover_src:string
}
interface roleItem{
    id:number
    /** 头衔名称 **/
    name:string
    stat:number
    /** 参考el-tag的color属性 **/
    color:string
    /** 参考el-tag的type属性 **/
    type:string
    /** 参考el-tag的effect属性 **/
    effect:string
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
interface cateItem{
    id:number
    name:string
    stat:number
}