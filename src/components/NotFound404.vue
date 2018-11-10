<template>
  <div class="nb-error">
      <div class="error-code">{{ statusCode }}</div>
      <h3 class="font-bold">We couldn't find the page..</h3>
      <div class="error-desc">
          Sorry, but the page you are looking for was either not found or does not exist. <br/>
          Try refreshing the page or click the button below to go back to the Homepage.
         <ul class="list-inline text-center text-sm">
           <li class="list-inline-item"><router-link to="/" class="text-muted">Go to App</router-link></li>
         </ul>
      </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound404',
  data() {
    return {
      statusCode: 404,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nb-error {
  margin: 0 auto;
  text-align: center;
  max-width: 480px;
  padding: 60px 30px;
}

.nb-error .error-code {
  color: #2d353c;
  font-size: 96px;
  line-height: 100px;
}

.nb-error .error-desc {
  font-size: 12px;
  color: #647788;
}
.nb-error .input-group{
  margin: 30px 0;
}
</style>
