<template>
    <v-app id="inspire">
        <v-content>
            <v-container
                    class="fill-height"
                    fluid
            >
                <v-row
                        align="center"
                        justify="center"
                >
                    <v-col
                            cols="12"
                            sm="8"
                            md="4"
                    >
                        <v-card class="elevation-12">
                            <v-toolbar
                                    color="red darken-1"
                                    dark
                                    flat
                            >
                                <v-toolbar-title >Login</v-toolbar-title>
                                <div class="flex-grow-1"></div>

                            </v-toolbar>
                            <v-card-text>
                                <v-form>
                                    <v-text-field
                                            label="Email"
                                            name="login"
                                            type="text"
                                            v-model = "email"
                                    ></v-text-field>

                                    <v-text-field
                                            id="password"
                                            label="Password"
                                            name="password"
                                            type="password"
                                            v-model = "password"
                                    ></v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <div class="flex-grow-1"></div>
                                <v-btn v-on:click="login" dark color="red darken-1">Login</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import {App} from '../config';
    export default {
        props: {
            source: String,
        },

        data: function(){
            return{
                email:'',
                password:''
            }
        },

        methods:{
            login: function(e) {
                App
                    .auth()
                    .signInWithEmailAndPassword(this.email, this.password)
                    .then( 
                        user => {
                            console.log("call me");
                            this.$router.push('/Dashboard')
                        },
                        err => {
                            alert(err.message);
                        }
                    )
                e.preventDefault();
            }
        }
    }
</script>
