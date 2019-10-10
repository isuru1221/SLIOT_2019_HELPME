<template>

    <v-container fluid>
        <v-layout row>
            <v-flex>
                <gmap-map
                        :center="center"
                        :zoom="10"
                        style="width:1200px;  height: 800px;"
                >
                    <gmap-marker
                            :key="index"
                            v-for="(m, index) in markers"
                            :position="m.position"
                            @click="center=m.position"
                    ></gmap-marker>
                </gmap-map>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import {Firestore} from '../config';
    export default {
        name: "GoogleMap",
        data() {
            return {
                center: { lat: 45.508, lng: -73.587 },
                markers: [],
                places: [],
                currentPlace: null,
                data:[],
            };
        },
        beforeMount(){
            this.getData()
        },
        mounted() {
            this.geolocate();
            this.addMarker();
        },

        methods: {
            async getData() {
                const ref = Firestore.collection('Ambulance');
                await ref.onSnapshot(querySnapshot => {
                    this.data = [];
                    querySnapshot.forEach(doc => {
                        this.data.push(doc.data());
                    });
                    for (let i = 0; i < this.data.length; i++) {
                        this.addPosition(this.data[i].d.coordinates);
                    }
                }, err => {
                    console.log(`Encountered error: ${err}`);
                });
            },
            setPlace(place) {
                this.currentPlace = place;
            },
            addPosition(position){
                const marker = {
                    lat: position._lat,
                    lng: position._long
                };
                this.markers.push({ position: marker });
            },
            addMarker() {
                navigator.geolocation.getCurrentPosition(position => {
                    const marker = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                        this.markers.push({ position: marker });
                        this.places.push(this.currentPlace);
                        this.center = marker;
                        this.currentPlace = null;

                });

            },
            geolocate: function() {
                navigator.geolocation.getCurrentPosition(position => {
                    this.center = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                });
            },
        }
    };
</script>
