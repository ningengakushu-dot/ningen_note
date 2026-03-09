export default function Home() {
  return (
    <div>
      <main>
        <div id="view-home">
          <div>
            <h1>記事一覧</h1>
            <div id="category-filters">
            </div>
          </div>

          <div id="post-grid">
          </div>
        </div>

        <div id="view-detail">
          <button>
            <i data-lucide="arrow-left"></i> 一覧に戻る
          </button>
          <div id="detail-header">
          </div>
          <div id="detail-content">
          </div>
        </div>
      </main>
    </div>
  );
}
