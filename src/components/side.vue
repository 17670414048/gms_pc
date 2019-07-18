<template>
        <div class="sidebar">
       <ul class="sidebar-el-menu el-menu">
           <router-link to="/appointList">
            <li class="el-menu-item">预约登记</li>
            </router-link>
               <router-link to="/challengeList">
            <li class="el-menu-item">叫号列表</li>
               </router-link>
               <router-link to="/gmsList">
            <li class="el-menu-item">GMS报告列表</li>
                </router-link>
       </ul>
    </div>
</template>
<script>
export default {
    
}
</script>
<style>


.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar>ul{
    height: 100%;
    background-color:#515557;
}
.el-menu {
    border-right: 1px solid #e6e6e6;
    list-style: none;
    position: relative;
    margin: 0;
    padding-left: 0;
}

a .el-menu-item {
    color: #AAAAAA;
    text-align: center;
    height: 70px;
    line-height: 70px;
}
a .el-menu-item:focus, a .el-menu-item:hover {
    color: #FFFFFF;
    background-color:#515557;
}
a.router-link-active .el-menu-item {
    color: #FFFFFF;
background-color:rgba(255,255,255,0.15);
}
</style>


