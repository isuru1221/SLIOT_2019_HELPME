<template>
    <div>
        <v-card
                class="mx-auto"
                :flat="false"
                :loading="loading"
                :outlined="true"
                :elevation="1000"
                :raised="true"
                :width="400"
                :height="400"
        >
        <v-img
                v-if="media"
                class="white--text"
                height="200px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
        <v-card-title class="align-end fill-height">I'm a title</v-card-title>
        </v-img>
            <v-card-title v-else>I'm a title</v-card-title>

            <v-card-text>I'm card text</v-card-text>
            <v-card-actions v-if="actions">
                <v-btn icon>
                    <v-icon>mdi-heart</v-icon>
                </v-btn>
                <v-btn text>Click</v-btn>
                <v-btn outlined>Click</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
    export default {
        data: () => ({
            flat: false,
            media: true,
            loading: false,
            actions: true,
            outlined: false,
            elevation: undefined,
            raised: false,
            width: 344,
            height: undefined,
        }),
    }
</script>

<style scoped>
    .v-input__slider {
        width: 100%;
    }
</style>
