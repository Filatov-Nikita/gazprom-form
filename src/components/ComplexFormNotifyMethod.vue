<template>
  <AppFormSection>
    <AppFormTitle class="tw-mb-2">Способ получения уведомлений</AppFormTitle>
    <AppFieldset class="tw-mb-4">
      <AppCheck name="notifications_receiving.sms_checkbox" label="СМС уведомления" :value="true" />
      <AppInput
        v-if="sms"
        type="tel"
        name="notifications_receiving.sms"
        label="Номер телефона"
        rules="required"
      />
    </AppFieldset>
    <AppFieldset>
      <AppCheck
        name="notifications_receiving.email_checkbox"
        label="Электронная почта"
        :value="true"
      />
      <AppInput
        v-if="email"
        type="email"
        name="notifications_receiving.email"
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
    const sms = useFieldValue('notifications_receiving.sms_checkbox');
    const email = useFieldValue('notifications_receiving.email_checkbox');

    return {
      sms,
      email,
    };
  },
};
</script>

<style>
</style>
