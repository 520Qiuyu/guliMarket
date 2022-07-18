import { getMyOrderList } from "@/api"
import { myOrder } from "@/types/types"

export default {
    namespaced:true,
    actions:{
        async getOrderList(context:any,val:{page:number,limit:number}){
            const res = await getMyOrderList(val.page,val.limit)
            if(res.data.code === 200 ){
                context.commit("GETORDERLIST",res.data.data)
            }
        }
    },
    mutations:{
        GETORDERLIST(state:any,val:myOrder){
            state.myOrder = val
        }
    },
    getters:{},
    state:{
        myOrder:{} as myOrder
    }
}