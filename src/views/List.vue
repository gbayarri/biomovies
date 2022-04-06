<template>
  <!--<ul>
  <li v-for="item in items" :key="item">{{ item }}</li>
</ul>-->

<div class="absolute bottom-0 right-0 pr-2 pb-3">
    <Button label="Insert" icon="fa-solid fa-plus" @click="insertTask" />
</div>

<InputText type="text" v-model="insert_item" placeholder="Insert item" />

  <div class="card">
    <OrderList v-model="items" listStyle="height:auto" dataKey="id">
      <template #header> <i class="fa-solid fa-coffee"></i> List of Products </template>
      <template #item="slotProps">
        <div class="product-item">
          <div class="product-list-detail">
            <!--<h6 class="mb-2">{{ slotProps.item.name }}</h6>-->
            <Inplace :closable="true" @close="editTask(slotProps.item.id)">
                <template #display>
                    {{ slotProps.item.name || 'Click to Edit'}}
                </template>
                <template #content>
                    <InputText v-model="slotProps.item.name" autoFocus />
                </template>
            </Inplace>

          </div>
          <div class="product-list-action">
            <Button class="p-button-danger" icon="fa-solid fa-trash" @click="removeTask(slotProps.item.id)" />
          </div>
        </div>
      </template>
    </OrderList>
  </div>
</template>

<script>
//const { ipcRenderer } = require('electron')
import { ref, onMounted } from 'vue';
import * as NGL from 'ngl'
export default {
  setup() {
    
    console.log(NGL)

    // window IS MANDATORY
    const { ipcRenderer } = window.require('electron')

    const insert_item = ref()

    const items = ref([])

    // ask for data
    ipcRenderer.send('item-send')
    // receive data
    ipcRenderer.on('item-all', (e, data) => {
        items.value = data
    })

    const insertTask = () => {
        console.log("insetting!! " + insert_item.value)
        ipcRenderer.send('item-save', insert_item.value.trim())
        ipcRenderer.send('item-send')

        insert_item.value = ''
    }

    const editTask = (id) => {
      var foundIndex = items.value.findIndex(x => x.id == id);
      ipcRenderer.send('item-update', items.value[foundIndex].id, items.value[foundIndex].name.trim())
      ipcRenderer.send('item-send')
    }

    const removeTask = (id) => {
      console.log("remove " + id)
      ipcRenderer.send('item-delete', id)
      ipcRenderer.send('item-send')
    }

    return { insert_item, items, insertTask, editTask, removeTask };
  },
};
</script>

<style scoped>
.card {
  background: #ffffff;
  padding: 2rem;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  margin-bottom: 2rem;
}
.product-item {
  display: flex;
  align-items: left;
  padding: 0.5rem;
  width: 100%;
}

.product-item .product-list-action {
		display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

  .product-item .product-list-action button {
    z-index:10;
  }

.product-item .product-list-detail {
  flex: 1 1 0;
  display: flex;
        flex-direction: column;
        align-items: flex-start;
}

.product-item .product-list-detail .p-inplace {
  z-index:10;
}

@media screen and (max-width: 576px) {
  .product-item {
    flex-wrap: wrap;
  }

  .product-item .image-container {
    width: 100%;
    text-align: center;
  }

  .product-item img {
    margin: 0 0 1rem 0;
    width: 100px;
  }
}
</style>