import { defineStore } from "pinia";
import { supabase } from "@/supabaseClient.js";
import { ref , computed, watch } from "vue";
 export const useAuthStore = defineStore("auth", ()=>{
  
     
     const user = ref(null);
     
    const setUser = (...args) => {
        user.value = args[0];
        token.value= args[1];
        localStorage.setItem("users", JSON.stringify(user)); 
        
        
    
    }
    const isAuth = computed(() => {
        return user.value !== null;
    });

    if(localStorage.getItem("users")){
        user.value = JSON.parse(localStorage.getItem("users"));
    }

    watch(user, (newUser) => {
      localStorage.setItem("users", JSON.stringify(newUser));
    },{
        deep: true,
    })
    

    const signOut = () => {
        user.value = null;
        
        localStorage.removeItem("users");
        localStorage.removeItem("token")
    }
    return {
        
        
        user,
        setUser,
        signOut,
        isAuth
    }
 });