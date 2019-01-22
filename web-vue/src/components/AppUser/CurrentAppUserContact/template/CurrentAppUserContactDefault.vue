<template>
  <div>
    {{ fullName }}
  </div>
</template>

<script>
import CurrentAppUserContactScript from '../CurrentAppUserContactScript'

export default {
  name: "CurrentAppUserContact",
  mixins: [CurrentAppUserContactScript]
}
</script>
