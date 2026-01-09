<template>
    <div class="forbidden-container">
        <!-- Animated Background Elements -->
        <div class="background-shapes">
            <div class="shape shape-1"></div>
            <div class="shape shape-2"></div>
            <div class="shape shape-3"></div>
        </div>

        <!-- Main Content -->
        <div class="content-wrapper">
            <div class="error-content">
                <!-- 403 Illustration -->
                <div class="error-illustration">
                    <div class="error-number">403</div>
                    <svg class="error-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="url(#gradient)" stroke-width="2" />
                        <g transform="translate(50, 50)">
                            <line x1="-15" y1="-15" x2="15" y2="15" stroke="url(#gradient)" stroke-width="3"
                                stroke-linecap="round" />
                            <line x1="15" y1="-15" x2="-15" y2="15" stroke="url(#gradient)" stroke-width="3"
                                stroke-linecap="round" />
                        </g>
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style="stop-color: #ff6b6b; stop-opacity: 1" />
                                <stop offset="100%" style="stop-color: #ee5a52; stop-opacity: 1" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                <!-- Error Message -->
                <div class="error-message">
                    <h1 class="error-title">Access Denied</h1>
                    <p class="error-description">
                        You don't have permission to access this resource. Please contact your administrator
                        if you believe this is a mistake.
                    </p>
                </div>

                <!-- Action Buttons -->
                <div class="action-buttons">
                    <router-link to="/dashboard" class="btn btn-primary">
                        <span>← Back to Dashboard</span>
                    </router-link>
                    <router-link to="/" class="btn btn-secondary">
                        <span>Go to Home</span>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ForbiddenView'
};
</script>

<style scoped>
.forbidden-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #2d1b2e, #3d2645, #2d1f35);
    position: relative;
    overflow: hidden;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Background Animated Shapes */
.background-shapes {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
}

.shape {
    position: absolute;
    border-radius: 50%;
    opacity: 0.08;
    animation: float 6s ease-in-out infinite;
}

.shape-1 {
    width: 300px;
    height: 300px;
    background: linear-gradient(135deg, #ff6b6b, #ee5a52);
    top: -50px;
    right: -50px;
    animation-delay: 0s;
}

.shape-2 {
    width: 200px;
    height: 200px;
    background: linear-gradient(135deg, #ff8c6b, #ff6b6b);
    bottom: 50px;
    left: -50px;
    animation-delay: 2s;
}

.shape-3 {
    width: 150px;
    height: 150px;
    background: linear-gradient(135deg, #ee5a52, #ff6b6b);
    top: 50%;
    left: 10%;
    animation-delay: 4s;
}

@keyframes float {

    0%,
    100% {
        transform: translateY(0px);
    }

    50% {
        transform: translateY(30px);
    }
}

/* Content Wrapper */
.content-wrapper {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 500px;
    padding: 20px;
}

.error-content {
    text-align: center;
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 60px 40px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    animation: slideUp 0.6s ease-out;
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Error Illustration */
.error-illustration {
    margin-bottom: 40px;
    position: relative;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.error-number {
    font-size: 120px;
    font-weight: 900;
    background: linear-gradient(135deg, #ff6b6b, #ee5a52);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0;
    position: relative;
    z-index: 1;
    animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.7;
    }
}

.error-icon {
    width: 100px;
    height: 100px;
    position: absolute;
    right: 0;
    bottom: -20px;
    animation: shake 2s ease-in-out infinite;
}

@keyframes shake {

    0%,
    100% {
        transform: translateX(0);
    }

    25% {
        transform: translateX(-10px);
    }

    75% {
        transform: translateX(10px);
    }
}

/* Error Message */
.error-message {
    margin-bottom: 40px;
}

.error-title {
    font-size: 32px;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 15px;
    line-height: 1.2;
}

.error-description {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.6;
    margin: 0;
}

/* Action Buttons */
.action-buttons {
    display: flex;
    gap: 15px;
    flex-direction: column;
    align-items: center;
}

.btn {
    padding: 12px 32px;
    border-radius: 10px;
    text-decoration: none;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 200px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.btn-primary {
    background: linear-gradient(135deg, #ff6b6b, #ee5a52);
    color: white;
    box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 107, 107, 0.6);
}

.btn-secondary {
    background: transparent;
    color: #ff6b6b;
    border: 2px solid #ff6b6b;
}

.btn-secondary:hover {
    background: rgba(255, 107, 107, 0.1);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 107, 107, 0.3);
}

.btn span {
    display: flex;
    align-items: center;
    gap: 8px;
}

/* Responsive Design */
@media (max-width: 768px) {
    .error-content {
        padding: 40px 25px;
    }

    .error-number {
        font-size: 80px;
    }

    .error-title {
        font-size: 24px;
    }

    .error-description {
        font-size: 14px;
    }

    .btn {
        padding: 10px 24px;
        font-size: 14px;
        min-width: 160px;
    }

    .action-buttons {
        flex-direction: column;
        gap: 12px;
    }

    .shape-1 {
        width: 200px;
        height: 200px;
    }

    .shape-2 {
        width: 150px;
        height: 150px;
    }

    .shape-3 {
        width: 100px;
        height: 100px;
    }
}

@media (max-width: 480px) {
    .forbidden-container {
        min-height: auto;
        padding: 40px 0;
    }

    .error-content {
        padding: 30px 20px;
    }

    .error-number {
        font-size: 60px;
    }

    .error-title {
        font-size: 20px;
    }

    .error-description {
        font-size: 13px;
    }

    .btn {
        padding: 10px 20px;
        font-size: 13px;
        min-width: 140px;
    }

    .action-buttons {
        gap: 10px;
    }
}
</style>