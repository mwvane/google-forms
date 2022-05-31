<template>
  <div class="paragraph-container">
    <font-awesome-icon icon="align-left"></font-awesome-icon>
    <span class="span">Long answer</span>
  </div>
</template>

<script>
import ComponentLayout from "@/components/ComponentLayout";
export default {
  name: "ParagraphComponent",
  components:{
    
  }
}
</script>

<style scoped>
.paragraph-container{
  display: flex;
  color: #504e4e;
  margin-top: 15px;
  margin-bottom: 15px;
}
.span{
  margin-left: 15px;
  border-bottom: 1px dotted;
  width: 70%;
}
</style>