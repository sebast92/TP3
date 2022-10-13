new Vue({
    el: '#app',
    data: {
        saludJugador: 100,
        saludMonstruo: 100,
        hayUnaPartidaEnJuego: false,
        turnos: [], //es para registrar los eventos de la partida
        esJugador: false,
        rangoAtaque: [3, 10],
        rangoAtaqueEspecial: [10, 20],
        rangoAtaqueDelMonstruo: [5, 12],
    },

    methods: {
        getSalud(salud) {
            return `${salud}%`
        },

        empezarPartida: function () {
            this.hayUnaPartidaEnJuego = true,
            this.saludJugador = 100,
            this.saludMonstruo = 100,
            this.turnos = []
        },

        atacar: function () {
            var danio = this.calcularHeridas(this.rangoAtaque[0], this.rangoAtaque[1]);
            if(this.saludMonstruo - danio < 0) {
                this.saludMonstruo = 0
            } else {
                this.saludMonstruo -= danio
            }

            this.turnos.unshift({
                esJugador: true,
                text: "El jugador ataca al monstruo por " + danio
            });
            this.ataqueDelMonstruo();
        },

        ataqueEspecial: function () {
            var danio = this.calcularHeridas(this.rangoAtaqueEspecial[0], this.rangoAtaqueEspecial[1]);
            if(this.saludMonstruo - danio < 0) {
                this.saludMonstruo = 0;
            } else {
                this.saludMonstruo -= danio;
            }
            this.turnos.unshift({
                esJugador: true,
                text: "El jugador usa ataque especial contra el monstruo por " + danio
            });
            this.ataqueDelMonstruo();
        },

        curar: function () {
            if(this.saludJugador < 90) {
                this.saludJugador += 10;
            } else {
                this.saludJugador == 100;
            };
            this.turnos.unshift({
                esJugador: true,
                text: "El jugador se cura y su vida ahora es " + this.saludJugador
            });
            this.ataqueDelMonstruo();
        },

        registrarEvento(evento) {
        },

        terminarPartida: function () {
            this.hayUnaPartidaEnJuego = false;
        },

        ataqueDelMonstruo: function () {
            var danio = this.calcularHeridas(this.rangoAtaqueDelMonstruo[0], this.rangoAtaqueDelMonstruo[1]);
            if(this.saludJugador - danio < 0) {
                this.saludJugador = 0
            } else {
                this.saludJugador -= danio
            }

            this.turnos.unshift({
                esJugador: false,
                text: "El monstruo ataca al jugador por " + danio
            });
            this.verificarGanador();
        },

        calcularHeridas: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);

        },
        verificarGanador: function () {
            if (this.saludMonstruo == 0) {
                window.alert("Has vencido al monstruo!");
                this.terminarPartida();
            } else if(this.saludJugador == 0) {
                window.alert("El monstruo te ha vencido!");
                this.terminarPartida();
            };
        },
        cssEvento(turno) {
            //Este return de un objeto es prque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
            return {
                'player-turno': turno.esJugador,
                'monster-turno': !turno.esJugador
            }
        }
    }
});