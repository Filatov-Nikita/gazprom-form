<template>
  <AppFormSection>
    <AppFormTitle class="tw-mb-2">Способ получения уведомлений</AppFormTitle>
    <AppFieldset class="tw-mb-4">
      <AppCheck name="notidyMethod.sms" label="СМС уведомления" :value="true" />
      <AppInput
        v-if="sms"
        type="tel"
        name="getMethod.phone"
        label="Номер телефона"
        rules="required"
      />
    </AppFieldset>
    <AppFieldset>
      <AppCheck
        name="notidyMethod.email"
        label="Электронная почта"
        :value="true"
      />
      <AppInput
        v-if="email"
        type="email"
        name="notidyMethod.emailAddress"
        label="Адрес электронной почты"
        rules="required|email"
      />
    </AppFieldset>
  </AppFormSection>
</template>

<script>
import { useFieldValue } from 'vee-validate';

export default {
  setup() {
    const sms = useFieldValue('notidyMethod.sms');
    const email = useFieldValue('notidyMethod.email');

    return {
      sms,
      email,
    };
  },
};
</script>

<style>
</style>
