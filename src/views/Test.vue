<template>
  <div>
    <table>
      <tr>
        <th>test A</th>
        <th>test B</th>
      </tr>
    </table>
    {{ message }}
  </div>
</template>

<script>
export default {
  name: "Test",
  data(){
    return{
      message:'hello vue'
    }
  },
  created(){
    axios.get('http://localhost:8080/Test').then(function (resp){
      console.log(resp);
    })
  }
}
</script>

<style scoped>

</style>