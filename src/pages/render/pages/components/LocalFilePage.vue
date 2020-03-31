<template>
    <div class="LocalFile">
        <div class="local_title_box">
            <span class="local_title">
                本地歌曲<label>共0首</label>
            </span>
            <div class="select_local">
                <button class="local_btn">更換目錄</button>
                <div class="local_sel_popel">
                    <span>當前目錄：C:/User/jocode/Music</span>
                    <button>選擇目錄</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"LocalFilePage"
}
</script>
<style scoped>
.LocalFile{
    margin-top: 80px;
    padding: 0 30px;
}
.local_title{
    font-size: 24px;
    font-weight: bold;
}
.local_title label{
    font-weight: unset;
    font-size: 12px;
    margin-left: 5px;
}
.local_title_box{
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.26);
}
.select_local{
    position: relative;
}
.local_btn{
    /* margin-right: 30px; */
    border: 0;
    /* border-bottom: 1px solid rgb(49, 112, 255); */
    color: rgb(49, 112, 255);
    background: none;
    outline: none;
    cursor: pointer;
}
.local_sel_popel{
    display: flex;
    position: absolute;
    background: white;
    width: 300px;
    height: 100px;
    top: 30px;
    right: 0;
    flex-direction: column;
    /* border: 1px solid rgba(0, 0, 0, 0.432); */
    border-radius: 5px;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.349);
    padding: 15px;
}
.local_sel_popel span{
    color: rgb(49, 112, 255);
    margin-bottom: 20px;
    font-size: 12px;
}
.local_sel_popel button{
    border: 0;
    background: rgb(49, 112, 255);
    color: white;
    border-radius: 5px;
    padding: 10px 20px;
    width: 100px;
}
</style>