<template>
    <DialogRoot>
        <!-- Botón trigger -->
        <DialogTrigger>
            <slot name="trigger"></slot>
        </DialogTrigger>

        <DialogPortal>
            <!-- Overlay -->
            <DialogOverlay class="fixed inset-0 bg-black/40 z-50" />

            <!-- Drawer Content -->
            <transition enter-active-class="transition-transform duration-300"
                leave-active-class="transition-transform duration-300"
                :enter-from-class="props.direction === 'right' ? 'translate-x-full' : '-translate-x-full'"
                enter-to-class="translate-x-0" :leave-from-class="'translate-x-0'"
                :leave-to-class="props.direction === 'right' ? 'translate-x-full' : '-translate-x-full'">
                <DialogContent class="fixed top-0 right-0 h-full bg-white dark:bg-gray-800 z-50 p-6 flex flex-col"
                    :class="[SIZE_CLASSES[props.size || 'md'], DIRECTION_CLASSES[props.direction || 'right']]">
                    <!-- Header -->
                    <div class="flex justify-between items-center mb-4">
                        <DialogTitle v-if="props.header" class="text-lg font-semibold text-slate-900 dark:text-white">
                            {{ props.header }}
                        </DialogTitle>
                        <DialogClose as-child
                            class="rounded-full text-gray-700 cursor-pointer h-[25px] w-[25px] inline-flex items-center justify-center text-primary absolute top-[5px] right-[5px] hover:bg-slate-100 outline-hidden">
                            <vue-feather size="20" type="x" />
                        </DialogClose>
                    </div>

                    <!-- Descripción -->
                    <DialogDescription v-if="props.description" class="text-sm text-gray-600 dark:text-gray-300 mb-4">
                        {{ props.description }}
                    </DialogDescription>

                    <!-- main content -->
                    <section name="drawer-content">
                        <slot name="content"></slot>
                    </section>
                    <!-- Botón guardar -->
                    <div class="mt-6 flex justify-end">
                        <DialogClose as-child>
                            <slot name="close"></slot>
                        </DialogClose>
                    </div>
                </DialogContent>
            </transition>
        </DialogPortal>
    </DialogRoot>
</template>

<script setup lang="ts">
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogOverlay,
    DialogPortal,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from 'reka-ui'

type DrawerProps = {
    size?: 'sm' | 'md' | 'lg' | 'xl'
    direction?: 'left' | 'right'
    header?: string
    description?: string
}

const SIZE_CLASSES: Record<string, string> = {
    sm: 'w-96',
    md: 'w-150',
    lg: 'w-1/2',
    xl: 'w-3/4',
}

const DIRECTION_CLASSES: Record<string, string> = {
    left: 'left-0',
    right: 'right-0',
}

const TRANSITION_CLASSES: Record<string, string> = {
    left: 'translate-x-0',
    right: 'translate-x-full',
}

const props = withDefaults(defineProps<DrawerProps>(), {
    size: 'md',
    direction: 'right',
})


</script>
