<template>
  <AppFormSection>
    <AppFormTitle>Данные об объекте капитального строительства</AppFormTitle>
    <AppFieldset>
      <AppInput name="building.name" rules="required" label="Наименование" />
      <AppSelect
        name="building.type"
        rules="required"
        label="Вид"
        :options="typeOpts"
      />
      <AppInput
        name="building.number"
        rules="required"
        label="Кадастровый номер участка"
      />
      <ComplexFormPtAddrress
        path="building"
        title="Адрес объекта газификации"
      />
      <AppSelect
        cantEmpty
        name="building.input"
        rules="required"
        label="Ввод объекта в эксплуатацию"
        :options="inputOpts"
      />
      <AppInput
        v-if="input?.value === '1'"
        type="date"
        name="building.inputDate"
        rules="required"
        label="Дата ввода объекта в эксплуатацию"
      />
      <AppInput
        v-else-if="input?.value === '2'"
        type="date"
        name="building.inputDateAbout"
        rules="required"
        label="Ориентировочная дата завершения строительства"
      />

      <FieldArray
        name="building.steps"
        v-slot="{ fields, push, remove }"
      >
        <AppFormCard v-if="input?.value === '3'">
          <AppFormTitle level="3"
            >Поэтапный ввод объкта в эксплуатацию</AppFormTitle
          >
          <AppFieldset>
            <div v-for="(field, idx) in fields" :key="field.key">
              <div>Этап {{ idx + 1 }}</div>
              <AppInput
                type="date"
                :name="`building.steps[${idx}].plan`"
                :label="`План. срок проектирования ЭПУ`"
              />
              <AppInput
                type="date"
                :name="`building.steps[${idx}].date`"
                :label="`Дата ввода объекта	`"
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
          <AppButton class="tw-mt-6" @click="push({ plan: '', date: '' })">
            Добавить этап
          </AppButton>
        </AppFormCard>
      </FieldArray>
      <FieldArray
        name="building.plan"
        v-slot="{ fields, push, remove }"
      >
        <AppFormCard v-if="input">
          <AppFormTitle level="3"
            >Планируемое распределение МЧРГ по этапам и очередям</AppFormTitle
          >
          <AppFieldset>
            <div v-for="(field, idx) in fields" :key="field.key">
              <AppInput
                :name="`building.plan[${idx}]`"
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
          <AppButton class="tw-mt-6" @click="push('')">
            Добавить этап
          </AppButton>
        </AppFormCard>
      </FieldArray>
      <FieldArray
        name="building.max"
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
                :name="`building.max[${idx}]`"
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
          <AppButton class="tw-mt-6" @click="push('')">
            Добавить точку
          </AppButton>
        </AppFormCard>
      </FieldArray>

      <AppSelect
        cantEmpty
        name="building.s1"
        :options="s1Opts"
        label="Сети ГРП, ГПП, принадлежат третьим лицам?"
      />
      <AppSelect
        cantEmpty
        name="building.s2"
        label="Подключение осуществляется с использованием объектов инфраструктуры и другого имущества общего пользования?"
      />
      <AppSelect
        cantEmpty
        name="building.s3"
        label="Подключение объектов капитального строительства, расположенных в пределах территории, подлежащей комплексному освоению?"
      />
      <AppSelect
        cantEmpty
        name="building.s4"
        label="Подключение осуществляется с уступкой права на использование мощности?"
      />
      <AppSelect
        disabled
        cantEmpty
        name="building.s5"
        label="Заполнить заявку на заключение договора на газификацию в пределах границ земельного участка заявителя?"
      />
      <AppSelect
        cantEmpty
        name="building.s6"
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
      { label: 'Не знаю', value: '?' },
      { label: 'Да', value: 'Yes' },
      { label: 'Нет', value: 'No' },
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

    const input = useFieldValue('building.input');

    return {
      typeOpts,
      inputOpts,
      input,
      s1Opts,
    };
  },
  components: {
    ComplexFormPtAddrress,
  },
};
</script>

<style>
</style>
