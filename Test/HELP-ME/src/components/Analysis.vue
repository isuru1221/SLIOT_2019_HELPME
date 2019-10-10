<template>
    <v-container>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
    </v-container>
</template>

<script>
    import {Firestore} from '../config';
    import Card from './Card';
    export default {
        components: {
            Card
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
