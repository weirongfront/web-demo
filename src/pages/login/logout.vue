<template>
    <div class="logout">

    </div>
</template>
<script>
import {mapActions} from 'vuex';
export default {
    name: 'logout',
    data(){
        return {
            name: ''
        }
    },
    mounted(){
        this.userLogOut();
    },
    methods: {
        ...mapActions('user', {
            logOut: 'logOut'
        }),
        // 退出登录
        userLogOut(){
            this.logOut().then(res => {
                if(res.code == 200){
                    this.$router.push('/')
                }
            });
        }
    }
}
</script>