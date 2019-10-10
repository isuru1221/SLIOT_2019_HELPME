<template>
    <v-container>
            Accident
            <ul id="example-1">
                <li v-for="item in data">
                    {{ item }}
                </li>
            </ul>
            <v-btn  @click="getData">Click</v-btn>
    </v-container>
</template>

<script>
    import {Firestore} from '../config';
    export default {
        components: {
        },
        props: {
        },
        mounted() {
            this.getData()
        },
        data (){
            return {
                component:"val",
                data:[],
            }
        },
        methods: {
            async getData() {
                const ref = Firestore.collection('Ambulance');
                await ref.onSnapshot(querySnapshot => {
                    this.data = [];
                    querySnapshot.forEach(doc => {
                        this.data.push(doc.data());
                    });
                }, err => {
                    console.log(`Encountered error: ${err}`);
                });
            },
        }
    };
</script>
