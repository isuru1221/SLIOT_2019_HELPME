<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" app clipped>
            <v-list dense>
                <v-list-item @click="Dashboard">
                    <v-list-item-action>
                        <v-icon>mdi-view-dashboard</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Dashboard</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item @click="Accident">
                    <v-list-item-action>
                        <v-icon>mdi-car-wash</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Accidents</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item @click="Ambulance">
                    <v-list-item-action>
                        <v-icon>mdi-ambulance</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Ambulance</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app clipped-left>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Application</v-toolbar-title>
        </v-app-bar>

        <v-content>

            <v-container class="fill-height" fluid>
<!--                <component v-bind:is="HelloWorld"></component>-->
                <component v-bind:is="component" />
<!--                <HelloWorld/>-->
            </v-container>
        </v-content>

        <v-footer app>
            <span>&copy; 2019</span>
        </v-footer>
    </v-app>
</template>

<script>
    import HelloWorld from "./HelloWorld";
    import Map from "./Map";
    import Ambulance from  "./Ambulance";
    import Accident from "./Accident";
    import  Analysis from "./Analysis";

    export default {
        components: {
            Accident,
            Analysis,
            Ambulance,
            HelloWorld,
            Map,
        },
        props: {
            source: String,
        },
        created () {
            this.$vuetify.theme.dark = true
        },
        data (){
            return {
                component:"Map"
            }
        },
        methods: {
            Ambulance(){
                    this.component = Ambulance;
            },
            Accident(){
                this.component = Accident;
            },
            Dashboard(){
                this.component = Analysis;
            }
        }
    }
</script>
