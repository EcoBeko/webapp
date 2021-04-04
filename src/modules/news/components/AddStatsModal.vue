<template>
  <v-dialog v-model="isShow" max-width="800">
    <v-card>
      <v-card-title>Add stats</v-card-title>
      <v-card-text class="d-flex mt-2">
        <div class="waste-list pa-4">
          <h3>Select a categories</h3>
          <ul class="pa-0 pt-4">
            <li
              v-for="type in wasteTypes"
              :key="type.id"
              class="d-flex align-center justify-space-between"
            >
              <div class="icon d-flex align-center mr-4">
                <static-image
                  :src="type.icon"
                  :alt="type.title"
                  class="waste-type-icon mr-4"
                />
                <span>{{ type.title }}</span>
              </div>
              <v-checkbox v-model="selected" :value="type"></v-checkbox>
            </li>
          </ul>
        </div>
        <v-form class="waste-user-list pa-4 flex-grow-1" ref="form">
          <ul class="pa-0 pt-4">
            <li
              v-for="type in selected"
              :key="type.id"
              class="d-flex align-center justify-space-between"
            >
              <div class="icon d-flex align-center">
                <static-image
                  :src="type.icon"
                  :alt="type.title"
                  class="waste-type-icon mr-4"
                />
                <span>{{ type.title }}</span>
              </div>
              <v-text-field
                v-model="type.value"
                type="number"
                label="Amount"
                class="input-field"
                suffix="kg"
                :rules="[rules.required]"
              ></v-text-field>
            </li>
          </ul>
        </v-form>
      </v-card-text>
      <v-card-actions class="pa-6 pt-0 d-flex justify-end">
        <v-btn color="primary" @click="add">Add</v-btn>
        <v-btn color="primary" text outlined @click="cancel">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import { StatsService } from "../services/stats.service";
import StaticImage from "@/core/components/StaticImage.vue";
import FormValidator from "@/core/mixins/FormValidator";
import { AuthModule } from "@/modules/auth";
import { BaseModule } from "@/modules/base";

@Component({
  components: {
    StaticImage,
  },
})
export default class AddStatsModal extends Mixins(FormValidator) {
  isShow = false;
  wasteTypes = [];
  selected = [];
  formRef = "form";

  show() {
    this.isShow = true;
  }
  cancel() {
    this.isShow = false;
    this.selected = [];
  }

  async add() {
    if (!this.validateForm()) return;

    BaseModule.setLoadingStatus(true);

    await Promise.all(
      this.selected.map(type =>
        StatsService.addStatsRecord(AuthModule._user.id, type.id, type.value),
      ),
    );
    BaseModule.setLoadingStatus(false);

    BaseModule.showMessage({
      message: "Successfully added",
      color: "success",
    });

    this.selected = [];

    this.$emit("recalculate");
  }

  public async created() {
    this.wasteTypes = await StatsService.getWasteTypes();
  }
}
</script>

<style lang="scss" scoped>
.waste-list,
.waste-user-list {
  max-height: 500px;
  overflow-y: auto;
}
.waste-list {
  border: 1px solid $primary;
  border-radius: 5px;
}
.waste-type-icon {
  width: 30px;
  height: 30px;
}
.input-field {
  max-width: 150px;
}
</style>
