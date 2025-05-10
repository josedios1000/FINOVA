document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    const form = document.getElementById('applicationForm');
    const formSteps = document.querySelectorAll('.form-step');
    const steps = document.querySelectorAll('.step');
    const nextButtons = document.querySelectorAll('.next-btn');
    const prevButtons = document.querySelectorAll('.prev-btn');
    let currentStep = 0;

    // 1. Navegación entre pasos
    function showStep(stepIndex) {
        // Ocultar todos los pasos
        formSteps.forEach(step => {
            step.classList.remove('active');
        });
        
        // Mostrar el paso actual
        formSteps[stepIndex].classList.add('active');
        
        // Actualizar indicador de progreso
        steps.forEach((step, index) => {
            if (index <= stepIndex) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        
        currentStep = stepIndex;
    }

    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (validateStep(currentStep)) {
                showStep(currentStep + 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });

    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            showStep(currentStep - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    function validateStep(stepIndex) {
        let isValid = true;
        const currentStepForm = formSteps[stepIndex];
        const requiredFields = currentStepForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = 'var(--warning-color)';
                isValid = false;
                
                // Mostrar mensaje de error
                if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'error-message';
                    errorMessage.textContent = 'Este campo es requerido';
                    errorMessage.style.color = 'var(--warning-color)';
                    errorMessage.style.fontSize = '0.8rem';
                    errorMessage.style.marginTop = '5px';
                    field.parentNode.insertBefore(errorMessage, field.nextSibling);
                }
            } else {
                field.style.borderColor = 'var(--border-color)';
                const errorMessage = field.nextElementSibling;
                if (errorMessage && errorMessage.classList.contains('error-message')) {
                    errorMessage.remove();
                }
            }
        });
        
        if (!isValid) {
            showToast('Por favor completa todos los campos requeridos', 'error');
        }
        
        return isValid;
    }

    // 2. Gestión de experiencia laboral
    const addExperienceBtn = document.getElementById('addExperience');
    const experienceItems = document.getElementById('experienceItems');
    
    addExperienceBtn.addEventListener('click', function() {
        const experienceItem = document.createElement('div');
        experienceItem.className = 'experience-item';
        experienceItem.innerHTML = `
            <button type="button" class="remove-experience"><i class="fas fa-times"></i></button>
            <div class="form-grid">
                <div class="input-group">
                    <label class="required">Puesto</label>
                    <input type="text" name="experience[${experienceItems.children.length}][position]" required>
                </div>
                <div class="input-group">
                    <label class="required">Empresa</label>
                    <input type="text" name="experience[${experienceItems.children.length}][company]" required>
                </div>
                <div class="input-group">
                    <label class="required">Fecha de inicio</label>
                    <input type="date" name="experience[${experienceItems.children.length}][start_date]" required>
                </div>
                <div class="input-group">
                    <label>Fecha de fin</label>
                    <input type="date" name="experience[${experienceItems.children.length}][end_date]">
                </div>
                <div class="input-group full-width">
                    <label>Descripción</label>
                    <textarea name="experience[${experienceItems.children.length}][description]" rows="3"></textarea>
                </div>
            </div>
        `;
        
        experienceItems.appendChild(experienceItem);
        
        // Agregar evento al botón de eliminar
        experienceItem.querySelector('.remove-experience').addEventListener('click', function() {
            experienceItem.remove();
        });
    });

    // 3. Gestión de habilidades (tags)
    const skillsTags = document.getElementById('skillsTags');
    const skillInput = document.getElementById('skillInput');
    
    skillInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && this.value.trim()) {
            addSkillTag(this.value.trim());
            this.value = '';
        }
    });
    
    function addSkillTag(skill) {
        const tag = document.createElement('div');
        tag.className = 'skill-tag';
        tag.innerHTML = `
            ${skill}
            <button type="button" class="remove-tag"><i class="fas fa-times"></i></button>
            <input type="hidden" name="skills[]" value="${skill}">
        `;
        
        skillsTags.insertBefore(tag, skillsTags.firstChild);
        
        // Agregar evento al botón de eliminar
        tag.querySelector('.remove-tag').addEventListener('click', function() {
            tag.remove();
        });
    }

    // 4. Gestión de carga de archivos
    const uploadCards = document.querySelectorAll('.upload-card');
    
    uploadCards.forEach(card => {
        const fileInput = card.querySelector('input[type="file"]');
        const uploadBtn = card.querySelector('.upload-btn');
        const fileInfo = card.querySelector('.file-info');
        
        fileInput.addEventListener('change', function() {
            if (this.files.length) {
                const file = this.files[0];
                fileInfo.textContent = `${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`;
                uploadBtn.textContent = 'Cambiar Archivo';
                showToast('Archivo seleccionado correctamente', 'success');
            }
        });
    });

    // 5. Modal de confirmación
    const modal = document.getElementById('confirmationModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const closeModal = document.querySelector('.close-modal');
    
    function showModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function hideModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    closeModalBtn.addEventListener('click', hideModal);
    closeModal.addEventListener('click', hideModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            hideModal();
        }
    });

    // 6. Envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateStep(currentStep)) {
            // Simular envío del formulario
            setTimeout(() => {
                showModal();
                form.reset();
                
                // Limpiar experiencias y habilidades
                experienceItems.innerHTML = '';
                document.querySelectorAll('.skill-tag').forEach(tag => tag.remove());
                
                // Resetear al primer paso
                showStep(0);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 1000);
        }
    });

    // 7. Mostrar notificaciones
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 5000);
    }

    // Inicializar primer paso
    showStep(0);
});