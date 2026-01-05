<template>
  <div class="container py-5">
    <div class="row g-4">
      <!-- Main Article Card -->
      <div class="col-lg-8">
        <div class="article-card">
          <div class="article-card-header">
            <img
              :src="article?.thumbnail"
              :alt="article?.title"
              class="article-thumbnail"
            />
          </div>
          <div class="article-card-body">
            <h1 class="article-title">{{ article?.title }}</h1>
            <div class="article-meta">
              <div class="meta-item">
                <img
                  :src="article?.creator.avatar"
                  :alt="article?.creator.firstName"
                  class="meta-avatar"
                />
                <div class="meta-info">
                  <p class="meta-author">
                    {{ article?.creator.firstName }}
                    {{ article?.creator.lastName }}
                  </p>
                  <p class="meta-date">Published 2 days ago</p>
                </div>
              </div>
            </div>
            <div class="article-divider"></div>
            <div class="article-content">
              <p>{{ article?.content }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Author Card Sidebar -->
      <div class="col-lg-4">
        <div class="author-card">
          <div class="author-avatar-section">
            <img
              :src="article?.creator.avatar"
              :alt="article?.creator.firstName"
              class="author-avatar"
            />
            <div class="author-badge">Author</div>
          </div>
          <div class="author-info">
            <h5 class="author-name">
              {{ article?.creator.firstName }} {{ article?.creator.lastName }}
            </h5>
            <p class="author-bio">
              Content creator & storyteller. Sharing knowledge and insights.
            </p>
            <div class="author-stats">
              <div class="stat">
                <span class="stat-number">24</span>
                <span class="stat-label">Articles</span>
              </div>
              <div class="stat">
                <span class="stat-number">1.2K</span>
                <span class="stat-label">Followers</span>
              </div>
            </div>
            <button class="follow-btn">Follow Author</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useArticleStore } from "@/stores/article";
import { useRoute } from "vue-router";

const ArtitleStore = useArticleStore();
const route = useRoute();
let article = ref(null);

// for jam data load os derm 3 render jea muy component
// bug when refresh it reading title mun so we should use ? derm 3 kapea
onMounted(async () => {
  await ArtitleStore.getArticleById(route.params.id);
  article.value = ArtitleStore.article;
  // console.log(article)
});
</script>

<style scoped>
/* Main Article Card */
.article-card {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(87, 114, 249, 0.08);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.article-card:hover {
  box-shadow: 0 12px 36px rgba(87, 114, 249, 0.12);
  transform: translateY(-2px);
}

.article-card-header {
  height: 340px;
  overflow: hidden;
  background: linear-gradient(135deg, #f7f9ff 0%, #e6eefc 100%);
  position: relative;
}

.article-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.article-card:hover .article-thumbnail {
  transform: scale(1.02);
}

.article-card-body {
  padding: 40px;
}

.article-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.3;
  margin-bottom: 24px;
  word-break: break-word;
}

/* Article Meta Section */
.article-meta {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 24px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.meta-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #5772f9;
  flex-shrink: 0;
}

.meta-info {
  display: flex;
  flex-direction: column;
}

.meta-author {
  font-weight: 600;
  color: #1a1a1a;
  font-size: 0.95rem;
  margin: 0;
}

.meta-date {
  font-size: 0.85rem;
  color: #97a0b9;
  margin: 0;
}

.article-divider {
  height: 1px;
  background: linear-gradient(90deg, #5772f9 0%, transparent 100%);
  margin: 0 0 24px 0;
}

.article-content {
  font-size: 1.05rem;
  line-height: 1.8;
  color: #333;
}

.article-content p {
  margin-bottom: 16px;
}

/* Author Card */
.author-card {
  background: var(--bg-gradient);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(87, 114, 249, 0.2);
  padding: 32px 24px;
  color: white;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.author-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 36px rgba(87, 114, 249, 0.3);
}

.author-avatar-section {
  position: relative;
  margin-bottom: 20px;
}

.author-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid white;
  display: block;
  margin: 0 auto;
}

.author-badge {
  display: inline-block;
  background: rgba(255, 255, 255, 0.25);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 12px;
}

.author-info {
  width: 100%;
}

.author-name {
  font-size: 1.4rem;
  font-weight: 700;
  margin: 16px 0 8px 0;
  color: white;
}

.author-bio {
  font-size: 0.9rem;
  opacity: 0.9;
  margin-bottom: 20px;
  line-height: 1.5;
}

.author-stats {
  display: flex;
  justify-content: space-around;
  padding: 20px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 20px;
}

.stat {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 1.4rem;
  font-weight: 700;
  color: white;
}

.stat-label {
  font-size: 0.75rem;
  opacity: 0.85;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.follow-btn {
  width: 100%;
  background: white;
  color: #5772f9;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.follow-btn:hover {
  background: #f0f4ff;
  transform: scale(1.02);
}

.follow-btn:active {
  transform: scale(0.98);
}

/* Responsive Design */
@media (max-width: 992px) {
  .article-card-body {
    padding: 28px;
  }

  .article-title {
    font-size: 1.8rem;
  }

  .article-content {
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  .article-card-header {
    height: 250px;
  }

  .article-card-body {
    padding: 20px;
  }

  .article-title {
    font-size: 1.5rem;
    margin-bottom: 16px;
  }

  .author-card {
    padding: 24px 20px;
  }

  .author-avatar {
    width: 80px;
    height: 80px;
  }

  .author-name {
    font-size: 1.2rem;
  }
}
</style>
