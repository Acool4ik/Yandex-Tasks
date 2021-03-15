

// Castom routing for SPA app
export default class Router {
    router = []
    mode = null
    root = '/'

    constructor(options = {}) {
        this.mode = window.history.pushState ? 'history' : 'hash'
        if(options.mode) this.mode = options.mode
        if(options.root) this.root = options.root
    }

    add(path, cb) {
        this.router = [...this.router, {path, cb}]
        return this
    }

    remove(deletePath) {
        this.router = this.router.filter(({path}) => path !== deletePath)
        return this
    }

    flush() {
        this.router = []
        return this
    }
  
    clearSlashes(path) {
        path.toString()
            .replace(/\/$/, '') // delete last slash
            .replace(/^\//, '')
    }

    getFragment() {
        let fragment = ''

        if(this.mode === 'history') {
            fragment = this.clearSlashes(
                window.decodeURI(window.location.pathname + window.location.search)
            )

            fragment = this.root !== '/' ? fragment.replace(this.root, '') : fragment
        } else {
            const match = window.location.href.match(/#(.*)$/)
            fragment = match ? match[1] : ''
        }


        return this.clearSlashes(fragment)
    }


    navigate(path = '') {
        if(this.mode === 'history') {
            window.history.pushState(null, '', this.root + this.clearSlashes(path))
        } else {
            window.history.href = `${window.location.href.replace(/#(.*)$/, '')}#${path}` 
        }

        return this
    }

    listen() {
        clearInterval(this.interval)
        this.interval = setInterval(this.interval, 50)
    }

    interval() {
        if(this.current === this.getFragment()) return
        this.current = this.getFragment()

        this.router.some(route => {
            const match = this.current.match(route.path)

            if(match) {
                match.shift()
                route.cb.apply({}, match)
                return match || true
            }

            return false 
        })
    }

}