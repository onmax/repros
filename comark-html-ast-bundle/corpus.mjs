export const corpus = [
  {
    name: 'empty document',
    document: { nodes: [] },
    expected: '',
  },
  {
    name: 'inline HTML and escaped text',
    document: { nodes: [['p', {}, 'Hello ', ['strong', {}, 'world'], ' <tag>.']] },
    expected: '<p>Hello <strong>world</strong> &lt;tag&gt;.</p>',
  },
  {
    name: 'block separators and explicit HTML format',
    document: { nodes: [['h2', {}, 'Title'], ['p', {}, 'Text']] },
    options: { format: 'text/html' },
    expected: '<h2>Title</h2>\n<p>Text</p>',
  },
  {
    name: 'comment and void element',
    document: { nodes: [[null, {}, 'note'], ['img', { src: '/image.png', alt: 'sample' }]] },
    expected: '<!--note-->\n<img src="/image.png" alt="sample">',
  },
  {
    name: 'attribute binding and escaping',
    document: { nodes: [['a', { ':href': 'data.url', title: 'A "title"' }, 'go']] },
    options: { data: { url: 'https://example.test/' } },
    expected: '<a href="https://example.test/" title="A &quot;title&quot;">go</a>',
  },
  {
    name: 'async custom component with child rendering and data',
    document: { nodes: [['note-card', {}, ['strong', { $: { block: 0 } }, 'body']]] },
    options: {
      data: { note: 'ok' },
      components: {
        NoteCard: async ([_tag, _attrs, ...children], state) =>
          `<aside data-note="${state.data.note}">${await state.render(children)}</aside>`,
      },
    },
    expected: '<aside data-note="ok"><strong>body</strong></aside>',
  },
  {
    name: 'conditional custom handler delegating to HTML handler',
    document: { nodes: [['p', { class: 'marked' }, 'kept']] },
    options: {
      components: {
        marked: {
          match: ([tag, attrs]) => tag === 'p' && attrs.class === 'marked',
          handler: async (node, state, parent) => state.handlers.html(node, state, parent),
        },
      },
    },
    expected: '<p class="marked">kept</p>',
  },
];
