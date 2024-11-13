// main.js

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // -------------------- Validación de Formulario de Contacto --------------------
    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const nombre = document.getElementById('nombre');
            const email = document.getElementById('email');
            const mensaje = document.getElementById('mensaje');
            
            // Validación del nombre
            if(nombre.value.trim() === '') {
                showError(nombre, 'El nombre es requerido');
                isValid = false;
            } else {
                removeError(nombre);
            }
            
            // Validación del email
            if(!validateEmail(email.value)) {
                showError(email, 'Ingrese un email válido');
                isValid = false;
            } else {
                removeError(email);
            }
            
            // Validación del mensaje
            if(mensaje.value.trim() === '') {
                showError(mensaje, 'El mensaje es requerido');
                isValid = false;
            } else {
                removeError(mensaje);
            }
            
            if(isValid) {
                // Aquí iría el código para enviar el formulario
                alert('Formulario enviado correctamente');
                contactForm.reset();
            }
        });
    }

    // -------------------- Carrito de Compras --------------------
    let carrito = [];
    const botonesAgregar = document.querySelectorAll('.agregar-carrito');
    const carritoCounter = document.getElementById('carrito-counter');
    const carritoTotal = document.getElementById('carrito-total');
    
    // Agregar productos al carrito
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', function(e) {
            const producto = {
                id: this.dataset.id,
                nombre: this.dataset.nombre,
                precio: parseFloat(this.dataset.precio),
                cantidad: 1
            };
            
            agregarAlCarrito(producto);
            actualizarCarritoUI();
        });
    });

    // -------------------- Slider de Testimonios --------------------
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if(testimonialSlider) {
        let currentSlide = 0;
        const slides = testimonialSlider.querySelectorAll('.testimonial-slide');
        
        function showSlide(n) {
            slides.forEach(slide => slide.style.display = 'none');
            slides[n].style.display = 'block';
        }
        
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);
    }

    // -------------------- Animaciones al Scroll --------------------
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkScroll() {
        animatedElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if(rect.top <= windowHeight * 0.8) {
                el.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', checkScroll);

    // -------------------- Funciones Auxiliares --------------------
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorDiv = formGroup.querySelector('.error-message') || 
                        createErrorDiv();
        
        formGroup.classList.add('error');
        errorDiv.textContent = message;
        
        if(!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorDiv);
        }
    }

    function removeError(input) {
        const formGroup = input.parentElement;
        const errorDiv = formGroup.querySelector('.error-message');
        
        formGroup.classList.remove('error');
        if(errorDiv) {
            errorDiv.remove();
        }
    }

    function createErrorDiv() {
        const div = document.createElement('div');
        div.className = 'error-message text-danger mt-1';
        return div;
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function agregarAlCarrito(producto) {
        const itemExistente = carrito.find(item => item.id === producto.id);
        
        if(itemExistente) {
            itemExistente.cantidad++;
        } else {
            carrito.push(producto);
        }
        
        // Guardar en localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function actualizarCarritoUI() {
        if(carritoCounter) {
            carritoCounter.textContent = carrito.reduce((total, item) => 
                total + item.cantidad, 0);
        }
        
        if(carritoTotal) {
            carritoTotal.textContent = carrito.reduce((total, item) => 
                total + (item.precio * item.cantidad), 0).toFixed(2);
        }
        
        // Actualizar lista de productos en el carrito si existe
        const listaCarrito = document.getElementById('lista-carrito');
        if(listaCarrito) {
            listaCarrito.innerHTML = '';
            carrito.forEach(item => {
                const li = document.createElement('li');
                li.className = 'list-group-item d-flex justify-content-between';
                li.innerHTML = `
                    ${item.nombre} x${item.cantidad}
                    <span>$${(item.precio * item.cantidad).toFixed(2)}</span>
                `;
                listaCarrito.appendChild(li);
            });
        }
    }

    // -------------------- Modal de Productos --------------------
    const modalesProducto = document.querySelectorAll('.producto-modal');
    if(modalesProducto.length > 0) {
        modalesProducto.forEach(modal => {
            modal.addEventListener('show.bs.modal', function(event) {
                const button = event.relatedTarget;
                const id = button.getAttribute('data-producto-id');
                // Aquí puedes cargar la información del producto según el ID
                // Por ejemplo, hacer una petición a una API o cargar datos locales
            });
        });
    }

    // -------------------- Lazy Loading de Imágenes --------------------
    const imagenes = document.querySelectorAll('img[data-src]');
    const imageOptions = {
        threshold: 0,
        rootMargin: '0px 0px 50px 0px'
    };

    function preloadImage(img) {
        const src = img.getAttribute('data-src');
        if(!src) return;
        img.src = src;
        img.removeAttribute('data-src');
    }

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                preloadImage(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, imageOptions);

    imagenes.forEach(img => imageObserver.observe(img));

    // -------------------- Inicialización --------------------
    // Cargar carrito desde localStorage
    const carritoGuardado = localStorage.getItem('carrito');
    if(carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarCarritoUI();
    }

    // Verificar elementos animados inicialmente
    checkScroll();
});
document.addEventListener('DOMContentLoaded'), function() {}
    // Inicialización del mapa
    const map = L.map('map').setView([-34.603722, -58.381592], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Agregar marcadores para cada sucursal
    const sucursales = [
        {
            nombre: "Sucursal Centro",
            lat: -34.603722,
            lng: -58.381592
        },
        {
            nombre: "Sucursal Norte",
            lat: -34.593722,
            lng: -58.371592
        },
        {
            nombre: "Sucursal Sur",
            lat: -34.613722,
            lng: -58.391592
        }
    ];

    sucursales.forEach(sucursal => {
        L.marker([sucursal.lat, sucursal.lng])
         .bindPopup(sucursal.nombre)
         .addTo(map);
    });

    // Validación del formulario
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        if (!form.checkValidity()) {
            event.stopPropagation();
            form.classList.add('was-validated');
            return;
        }

        // Recoger datos del formulario
        const formData = {
            nombre: document.getElementById('nombre').value,
            email: document.getElementById('email').value,
            asunto: document.getElementById('asunto').value,
            mensaje: document.getElementById('mensaje').value
        };

        // Aquí irías el código para enviar el formulario
        // Por ahora solo mostraremos un alert
        alert('Mensaje enviado correctamente');
        form.reset();
        form.classList.remove('was-validated');
    });

    // Validación en tiempo real
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {})