export type Advantage = {
    title: string
    description: string
    image: string
    isRevercedText: boolean
}

export type Additional = {
    title: string
    description: string
    price: string
    button: string
    image: string
}

export type Services = {
    title: string
    options: string
    price: string
    button: string
    image: string
}

export const advantage: Record<string, Advantage> = {
    unity: {
        title: 'cooperation.advantages.allEvents.title',
        description: 'cooperation.advantages.allEvents.description',
        image: '/img/cooperation/advantage/allEvents.png',
        isRevercedText: false,
    },
    simplicity: {
        title: 'cooperation.advantages.simpleCreating.title',
        description: 'cooperation.advantages.simpleCreating.description',
        image: '/img/cooperation/advantage/simpleCreating.png',
        isRevercedText: true,
    },
    individuality: {
        title: 'cooperation.advantages.individualSearch.title',
        description: 'cooperation.advantages.individualSearch.description',
        image: '/img/cooperation/advantage/individualSearch.png',
        isRevercedText: false,
    },
    care: {
        title: 'cooperation.advantages.ourSupport.title',
        description: 'cooperation.advantages.ourSupport.description',
        image: '/img/cooperation/advantage/ourSupport.png',
        isRevercedText: true,
    },
    pages: {
        title: 'cooperation.advantages.eventPages.title',
        description: 'cooperation.advantages.eventPages.description',
        image: '/img/cooperation/advantage/eventPages.png',
        isRevercedText: false,
    }
}

export const services: Record<string, Services> = {
    base: {
        title: 'cooperation.package.basic.title',
        options: 'cooperation.package.basic.option',
        price: 'cooperation.package.basic.price',
        button: 'cooperation.package.basic.button',
        image: '/img/cooperation/package/basic.png',
    },
    exntended: {
        title: 'cooperation.package.standard.title',
        options: 'cooperation.package.standard.option',
        price: 'cooperation.package.standard.price',
        button: 'cooperation.package.standard.button',
        image: '/img/cooperation/package/standard.png',
    },
    premium: {
        title: 'cooperation.package.premium.title',
        options: 'cooperation.package.premium.option',
        price: 'cooperation.package.premium.price',
        button: 'cooperation.package.premium.button',
        image: '/img/cooperation/package/premium.png',
    },
}

export const additional: Record<string, Additional> = {
    social: {
        title: 'cooperation.additionalServices.socialMedia.title',
        description: 'cooperation.additionalServices.socialMedia.description',
        price: 'cooperation.additionalServices.socialMedia.price',
        button: 'cooperation.additionalServices.socialMedia.button',
        image: '/img/cooperation/additional/socialMedia.png',
    },
    target: {
        title: 'cooperation.additionalServices.targetedAdvertising.title',
        description: 'cooperation.additionalServices.targetedAdvertising.description',
        price: 'cooperation.additionalServices.targetedAdvertising.price',
        button: 'cooperation.additionalServices.targetedAdvertising.button',
        image: '/img/cooperation/additional/targetedAdvertising.png',
    },
    video: {
        title: 'cooperation.additionalServices.videoContent.title',
        description: 'cooperation.additionalServices.videoContent.description',
        price: 'cooperation.additionalServices.videoContent.price',
        button: 'cooperation.additionalServices.videoContent.button',
        image: '/img/cooperation/additional/videoContent.png',
    },
    interactive: {
        title: 'cooperation.additionalServices.interactiveElements.title',
        description: 'cooperation.additionalServices.interactiveElements.description',
        price: 'cooperation.additionalServices.interactiveElements.price',
        button: 'cooperation.additionalServices.interactiveElements.button',
        image: '/img/cooperation/additional/interactiveElements.png',
    },
}