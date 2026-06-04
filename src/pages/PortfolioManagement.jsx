import { useState, useEffect } from 'react';
import { appClient } from '@/api/appClient';
import PageLayout from '../components/layout/PageLayout';
import { Plus, Edit, Trash2, Upload } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export default function PortfolioManagement() {
  const [user, setUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '', slug: '', excerpt: '', content: '', category: 'Design Guide',
    tags: '', featuredImage: '', metaTitle: '', metaDescription: '', published: false
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    appClient.auth.isAuthenticated().then(async authed => {
      if (authed) {
        const me = await appClient.auth.me();
        setUser(me);
      }
    });
  }, []);

  const { data: posts = [] } = useQuery({
    queryKey: ['portfolio-posts'],
    queryFn: () => appClient.entities.PortfolioPost.list('-created_date'),
    enabled: !!user && user.role === 'admin',
  });

  const createMutation = useMutation({
    mutationFn: (data) => appClient.entities.PortfolioPost.create({
      ...data,
      tags: data.tags.split(',').map(t => t.trim()).filter(Boolean),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio-posts'] });
      setShowForm(false);
      setFormData({ title: '', slug: '', excerpt: '', content: '', category: 'Design Guide', tags: '', featuredImage: '', metaTitle: '', metaDescription: '', published: false });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => appClient.entities.PortfolioPost.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['portfolio-posts'] }),
  });

  if (!user || user.role !== 'admin') {
    return (
      <PageLayout>
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-center">
            <h2 className="font-condensed font-black text-navy text-2xl uppercase mb-2">Access Denied</h2>
            <p className="font-inter text-steel text-sm">Admin access required.</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="bg-navy py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="font-condensed font-black text-white text-3xl uppercase">Portfolio Management</h1>
            <button
              onClick={() => setShowForm(true)}
              className="yellow-btn px-6 py-3 text-sm flex items-center gap-2"
            >
              <Plus size={16} /> New Post
            </button>
          </div>
        </div>
      </div>

      <div className="py-12 bg-white grid-overlay">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {showForm && (
            <div className="mb-12 border border-silver p-8 bg-white">
              <h2 className="font-condensed font-bold text-navy text-xl uppercase mb-6">
                {editingPost ? 'Edit Post' : 'New Portfolio Post'}
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Post Title"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full border border-silver px-4 py-2 font-inter text-sm"
                />
                <input
                  type="text"
                  placeholder="URL Slug (e.g. pole-barn-design-guide)"
                  value={formData.slug}
                  onChange={e => setFormData({...formData, slug: e.target.value})}
                  className="w-full border border-silver px-4 py-2 font-inter text-sm"
                />
                <textarea
                  placeholder="Excerpt (short summary)"
                  value={formData.excerpt}
                  onChange={e => setFormData({...formData, excerpt: e.target.value})}
                  rows={2}
                  className="w-full border border-silver px-4 py-2 font-inter text-sm resize-none"
                />
                <textarea
                  placeholder="Content (supports HTML)"
                  value={formData.content}
                  onChange={e => setFormData({...formData, content: e.target.value})}
                  rows={6}
                  className="w-full border border-silver px-4 py-2 font-inter text-sm resize-none"
                />
                <input
                  type="text"
                  placeholder="Featured Image URL"
                  value={formData.featuredImage}
                  onChange={e => setFormData({...formData, featuredImage: e.target.value})}
                  className="w-full border border-silver px-4 py-2 font-inter text-sm"
                />
                <select
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                  className="w-full border border-silver px-4 py-2 font-inter text-sm"
                >
                  <option>Design Guide</option>
                  <option>Case Study</option>
                  <option>Tutorial</option>
                  <option>Industry News</option>
                  <option>Contractor Tips</option>
                </select>
                <input
                  type="text"
                  placeholder="Tags (comma-separated: pole barn, permit, design)"
                  value={formData.tags}
                  onChange={e => setFormData({...formData, tags: e.target.value})}
                  className="w-full border border-silver px-4 py-2 font-inter text-sm"
                />
                <input
                  type="text"
                  placeholder="SEO Meta Title"
                  value={formData.metaTitle}
                  onChange={e => setFormData({...formData, metaTitle: e.target.value})}
                  className="w-full border border-silver px-4 py-2 font-inter text-sm"
                />
                <textarea
                  placeholder="SEO Meta Description"
                  value={formData.metaDescription}
                  onChange={e => setFormData({...formData, metaDescription: e.target.value})}
                  rows={2}
                  className="w-full border border-silver px-4 py-2 font-inter text-sm resize-none"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={e => setFormData({...formData, published: e.target.checked})}
                    id="published"
                  />
                  <label htmlFor="published" className="font-inter text-sm text-steel">Publish immediately</label>
                </div>
                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => setShowForm(false)}
                    className="px-6 py-2 border border-silver font-inter text-sm hover:bg-silver/20"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => createMutation.mutate(formData)}
                    className="yellow-btn px-6 py-2 text-sm"
                  >
                    {createMutation.isPending ? 'Saving...' : 'Save Post'}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {posts.length === 0 ? (
              <p className="text-center text-steel font-inter text-sm py-12">No posts yet. Create one to get started.</p>
            ) : (
              posts.map(post => (
                <div key={post.id} className="border border-silver p-4 flex items-center justify-between hover:bg-silver/10 transition-colors">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-condensed font-bold text-navy uppercase text-sm">{post.title}</h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-steel font-inter">
                      <span className="bg-yellow/20 text-yellow px-2 py-0.5">{post.category}</span>
                      <span>{post.published ? '✓ Published' : 'Draft'}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => deleteMutation.mutate(post.id)}
                      className="p-2 text-red-500 hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}