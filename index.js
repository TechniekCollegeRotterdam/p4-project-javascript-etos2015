const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.6
//sprite geeft aan welke kleur positie snelheid aan gravity zorgt ervoor dat er geen gat op de bodem onstaat en velocity geeft de snelheid van bewegingen aan

class Sprite {
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.lastKey
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, 50, this.height)
    }
    
    //update zorgd ervoor dat er wat gebeurt met de characters

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        } else this.velocity.y += gravity
    } 
}

// geeft positie en snelheid aan

const player = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    velocity: {

        x: 0,
        y: 0
    }
})

const enemy = new Sprite({
    position: {
        x: 400,
        y:100
    },
    velocity: {
        X: 0,
        y: 0
    }
})

console.log(player)

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    }
}

// met window request zorg je dat het scherm geupdate word en alleen het scherm zelf

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0
    
    // player movement
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -3.5
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 3.5
    }

    // enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -3.5
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 3.5
    }
}

animate()
//met keydown en event key roep je de knop die je hebt gedrukt en door deze te binden met d zeg je dat als deze geklikt word dat er iets moet gebeuren

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break
        case 'w':
            player.velocity.y = -16
            break
        // enemy keys
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'Arrowleft'
            break
        case 'ArrowUp':
            enemy.velocity.y = -16
            break
    }
    console.log(event.key)
})

// omdat als je alleen keydown hebt en 1 keer op d drukt gaat hij oneindig door dus moet je een eventlistener hebben om aan te geven als je d loslaat dat die stopt

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
    }

    //enemy keys
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
    }
    console.log(event.key)
})