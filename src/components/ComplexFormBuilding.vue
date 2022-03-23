<template>
  <AppFormSection>
    <AppFormTitle>Данные об объекте капитального строительства</AppFormTitle>
    <AppFieldset>
      <AppInput name="object_data.name" rules="required" label="Наименование" />
      <AppSelect
        name="object_data.kind"
        rules="required"
        label="Вид"
        :options="typeOpts"
      />
      <AppInput
        name="object_data.cadastral_number"
        rules="required"
        label="Кадастровый номер участка"
      />
      <ComplexFormPtAddrress
        path="object_data.address"
        title="Адрес объекта газификации"
      />
      <AppSelect
        cantEmpty
        name="object_data.commissioning"
        rules="required"
        label="Ввод объекта в эксплуатацию"
        :options="inputOpts"
      />
      <AppDatePicker
        v-if="input === '1'"
        name="object_data.commissioning_date"
        rules="required"
        label="Дата ввода объекта в эксплуатацию"
      />
      <AppDatePicker
        v-else-if="input === '2'"
        name="object_data.approximate_date"
        rules="required"
        label="Ориентировочная дата завершения строительства"
      />

      <FieldArray
        name="object_data.object_stages"
        v-slot="{ fields, push, remove }"
      >
        <AppFormCard v-if="input === '3'">
          <AppFormTitle level="3"
            >Поэтапный ввод объкта в эксплуатацию</AppFormTitle
          >
          <AppFieldset>
            <div v-for="(field, idx) in fields" :key="field.key">
              <div>Этап {{ idx + 1 }}</div>
              <AppDatePicker
                :name="`object_data.object_stages[${idx}].design_time`"
                :label="`План. срок проектирования ЭПУ`"
              />
              <AppDatePicker
                rules="required"
                :name="`object_data.object_stages[${idx}].input_date`"
                :label="`Дата ввода объекта`"
              />
              <AppButton
                v-if="idx > 0"
                class="tw-mt-1"
                size="xs"
                color="red-700"
                @click="remove(idx)"
                >Удалить</AppButton
              >
            </div>
          </AppFieldset>
          <AppButton class="tw-mt-6" @click="push({ design_time: '', input_date: '' })">
            Добавить этап
          </AppButton>
        </AppFormCard>
      </FieldArray>
      <FieldArray
        name="object_data.mchrg_stages"
        v-slot="{ fields, push, remove }"
      >
        <AppFormCard v-if="input">
          <AppFormTitle level="3"
            >Планируемое распределение МЧРГ по этапам и очередям</AppFormTitle
          >
          <AppFieldset>
            <div v-for="(field, idx) in fields" :key="field.key">
              <AppInput type="hidden" :name="`object_data.mchrg_stages[${idx}].stage`" />
              <AppInput
                rules="required"
                :name="`object_data.mchrg_stages[${idx}].value`"
                :label="`${idx + 1} этап - расход`"
              />
              <AppButton
                v-if="idx > 0"
                class="tw-mt-1"
                size="xs"
                color="red-700"
                @click="remove(idx)"
                >Удалить</AppButton
              >
            </div>
          </AppFieldset>
          <AppButton class="tw-mt-6" @click="push({ stage: `${fields.length + 1}`, value: '' })">
            Добавить этап
          </AppButton>
        </AppFormCard>
      </FieldArray>
      <FieldArray
        name="object_data.connection_points"
        v-slot="{ fields, push, remove }"
      >
        <AppFormCard v-if="input">
          <AppFormTitle level="3">
            Максимальная нагрузка (часовой расход газа) по каждой из точек
            подключения
          </AppFormTitle>
          <AppFieldset>
            <div v-for="(field, idx) in fields" :key="field.key">
              <AppInput
                type="hidden"
                :name="`object_data.connection_points[${idx}].point`"
              />
              <AppInput
                rules="required"
                :name="`object_data.connection_points[${idx}].value`"
                :label="`Точка ${idx + 1}: Часовой расход газа, м3/час`"
              />
              <AppButton
                class="tw-mt-1"
                v-if="idx > 0"
                size="xs"
                color="red-700"
                @click="remove(idx)"
                >Удалить</AppButton
              >
            </div>
          </AppFieldset>
          <AppButton class="tw-mt-6" @click="push({ point: `${fields.length + 1}`, value: '' })">
            Добавить точку
          </AppButton>
        </AppFormCard>
      </FieldArray>

      <AppSelect
        cantEmpty
        name="object_data.networks_belong_third_parties"
        :options="s1Opts"
        label="Сети ГРП, ГПП, принадлежат третьим лицам?"
      />
      <AppSelect
        cantEmpty
        name="object_data.connection_using_infrastructure"
        label="Подключение осуществляется с использованием объектов инфраструктуры и другого имущества общего пользования?"
      />
      <AppSelect
        cantEmpty
        name="object_data.connection_integrated_development"
        label="Подключение объектов капитального строительства, расположенных в пределах территории, подлежащей комплексному освоению?"
      />
      <AppSelect
        cantEmpty
        name="object_data.right_to_use_power"
        label="Подключение осуществляется с уступкой права на использование мощности?"
      />
      <AppSelect
        :disabled="radio !== '2'"
        cantEmpty
        name="object_data.gasification_contract"
        label="Заполнить заявку на заключение договора на газификацию в пределах границ земельного участка заявителя?"
      />
      <AppSelect
        cantEmpty
        name="object_data.gas_equipment"
        label="Подобрать газовое оборудование?"
      />
    </AppFieldset>
  </AppFormSection>
</template>

<script>
import ComplexFormPtAddrress from '@/components/ComplexFormPtAddrress';
import { markRaw } from 'vue';
import { useFieldValue } from 'vee-validate';

export default {
  setup() {
    const s1Opts = markRaw([
      { label: 'Не знаю', value: '3' },
      { label: 'Да', value: '2' },
      { label: 'Нет', value: '1' },
    ]);

    const typeOpts = markRaw([
      { label: 'Индивидуальное жилищное строительство', value: '1' },
      { label: 'Многоквартирный дом', value: '2' },
      { label: 'Нежилой фонд', value: '3' },
    ]);

    const inputOpts = markRaw([
      { label: 'Объект построен', value: '1' },
      { label: 'Объект строится', value: '2' },
      {
        label: 'Планируется поэтапный ввод объекта в эксплуатацию',
        value: '3',
      },
    ]);

    const input = useFieldValue('object_data.commissioning');
    const radio = useFieldValue('contract_kind.tp_contract_kind_radio');

    return {
      typeOpts,
      inputOpts,
      s1Opts,
      input,
      radio,
    };
  },
  components: {
    ComplexFormPtAddrress,
  },
};
</script>

<style>
</style>
