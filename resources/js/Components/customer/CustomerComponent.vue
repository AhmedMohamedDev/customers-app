<template>
      <button type="button" class="btn btn-success add-btn" @click="showAddModal = true">Add Customer</button>
    <div style="margin-top: 5%;">
      <div class="modal"  :class="{ 'd-block': showAddModal }">
        <div class="modal-dialog" >
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add Customer</h5>
              <button type="button" class="close" @click="showAddModal = false">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div style="white-space: pre-wrap; word-wrap: break-word; font-family: monospace; color: red" v-for="(error, index) in errors" :key="index">
                <span v-for="(validationError, index) in error" :key="index">
                    #   {{ validationError }}
                </span>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>First Name</label>
                    <input type="text" class="form-control small-input" v-model="newCustomer.first_name">
                </div>
              <div class="form-group">
                <label>Last Name</label>
                <input type="text" class="form-control small-input" v-model="newCustomer.last_name">
              </div>
              <div class="form-group">
                <label>Email</label>
                <input type="email" class="form-control small-input" v-model="newCustomer.email">
              </div>
              <div class="form-group">
                <label>User Name</label>
                <input type="text" class="form-control small-input" v-model="newCustomer.user_name">
              </div>
              <div class="form-group">
                <label>Salary</label>
                <input type="text" class="form-control small-input" v-model="newCustomer.salary">
              </div>
              <div class="form-group">
                <label>Status</label>
                <select class="form-control small-input" v-model="newCustomer.status">
                  <option value="0">Active</option>
                  <option value="1">Inactive</option>
                  <option value="2">Blocked</option>
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="showAddModal = false">Close</button>
              <button type="button" class="btn btn-success" @click="addCustomer">Save</button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal" :class="{ 'd-block': showEditModal }">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Edit Customer</h5>
              <button type="button" class="close" @click="showEditModal = false">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div style="white-space: pre-wrap; word-wrap: break-word; font-family: monospace; color: red" v-for="(error, index) in errors" :key="index">
                <span v-for="(validationError, index) in error" :key="index">
                    #   {{ validationError }}
                </span>
            </div>
            <div class="modal-body">
              <div hidden class="form-group">
                <label>ID</label>
                <input type="number" class="form-control" v-model="selectedCustomer.id">
              </div>
              <div class="form-group">
                <label>First Name</label>
                <input type="text" class="form-control" v-model="selectedCustomer.first_name">
              </div>
              <div class="form-group">
                <label>Last Name</label>
                <input type="text" class="form-control" v-model="selectedCustomer.last_name">
              </div>
              <div class="form-group">
                <label>Email</label>
                <input type="email" class="form-control" v-model="selectedCustomer.email">
              </div>
              <div class="form-group">
                <label>User name</label>
                <input type="text" class="form-control" v-model="selectedCustomer.user_name">
              </div>
              <div class="form-group">
                <label>Salary</label>
                <input type="number" class="form-control" v-model="selectedCustomer.salary">
              </div>
              <div class="form-group">
                <label>Status</label>
                <select class="form-control" v-model="selectedCustomer.status">
                  <option value="0">Active</option>
                  <option value="1">Inactive</option>
                  <option value="2">Blocked</option>
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="showEditModal = false">Close</button>
              <button type="button" class="btn btn-success" @click="updateCustomer">Save</button>
            </div>
          </div>
        </div>
      </div>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>User Name</th>
            <th>Salary</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(customer, index) in customers" :key="index">
            <td>{{ customer.id }}</td>
            <td>{{ customer.first_name }}</td>
            <td>{{ customer.last_name }}</td>
            <td>{{ customer.email }}</td>
            <td>{{ customer.user_name }}</td>
            <td>{{ customer.salary }}$</td>
            <td>{{ statusArr[customer.status] }}</td>
            <td>
              <button class="btn btn-sm btn-primary mr-2" @click="editCustomer(index)">Edit</button>
              <button class="btn btn-sm btn-danger" @click="deleteCustomer(index)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  <script type="ts">
import { mapState } from 'vuex';
  export default {
    data() {
        return {
          newCustomer: {
              first_name: '',
              last_name: '',
              email: '',
              user_name : '',
              salary: 0,
              status: 'Active'
            },
              showAddModal: false,
              showEditModal: false,
              selectedCustomer: {},
              targetCustomer:{},
              statusArr:{0:'Active',1:'Inactive',2:"Blocked"}
          }
        },
        mounted() {
            this.$store.dispatch('getCustomers');
        },
        computed: {
            ...mapState(['customers']),
            ...mapState(['errors'])
        },
        methods: {
            addCustomer() {
                // Add the new customer to the existing customers array
                this.$store.dispatch('submitCustomer',this.newCustomer).then(res => {
                        //Reset the new customer object
                        this.newCustomer = {
                        first_name: '',
                        last_name: '',
                        email: '',
                        user_name: '',
                        salary: 0,
                        status: 'Active'
                    };
                    // Close the add modal
                    this.showAddModal = false;
                })
            },
            editCustomer(index) {
                // Set the selected customer object
                this.selectedCustomer = Object.assign({}, this.customers[index]);
                // Reset errros
                this.$store.commit('clearErrors')
                // Open the edit modal
                this.showEditModal = true;
            },
            updateCustomer() {
                this.$store.dispatch('updateCustomer',this.selectedCustomer).then(res => {
                    // Find the index of the selected customer
                    const index = this.customers.findIndex(c => c.id === this.selectedCustomer.id);
                    // Update the customer in the customers array
                    this.customers[index] = this.selectedCustomer;
                    // Reset the selected customer object
                    this.selectedCustomer = {};
                    // Close the edit modal
                    this.showEditModal = false;
                })
            },
            deleteCustomer(index) {
                    this.targetCustomer = Object.assign({}, this.customers[index]);
                    this.$store.dispatch('deleteCustomer',this.targetCustomer.id).then(res => {
                    // Remove the customer from the customers array
                    this.customers.splice(index, 1);
                })
            }
        }
    }
</script>