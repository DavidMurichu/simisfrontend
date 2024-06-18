// assets
import { AppstoreOutlined, BookOutlined, FormOutlined, SearchOutlined, ExportOutlined, ImportOutlined } from '@ant-design/icons';

// icons
const icons = {
    AppstoreOutlined,
    BookOutlined,
    FormOutlined,
    SearchOutlined,
    ExportOutlined,
    ImportOutlined
};

// ==============================|| MENU ITEMS - INVENTORY ||============================== //

const inventory = {
    id: 'inventory',
    title: 'Inventory',
    type: 'group',
    children: [
        {
            id: 'item-categories',
            title: 'Item Categories',
            type: 'item',
            url: '/inventory/item-categories',
            icon: icons.AppstoreOutlined,
            target: false
        },
        {
            id: 'items-books-titles',
            title: 'Items/Books Titles',
            type: 'item',
            url: '/inventory/items-books-titles',
            icon: icons.BookOutlined,
            target: false
        },
        {
            id: 'items-books-register',
            title: 'Items/Books Register',
            type: 'item',
            url: '/inventory/items-books-register',
            icon: icons.FormOutlined,
            target: false
        },
        {
            id: 'view-search-items-books',
            title: 'View And Search Items/Books',
            type: 'item',
            url: '/inventory/view-search-items-books',
            icon: icons.SearchOutlined,
            target: false
        },
        {
            id: 'issue-item-book',
            title: 'Issue Item/Book',
            type: 'item',
            url: '/inventory/issue-item-book',
            icon: icons.ExportOutlined,
            target: false
        },
        {
            id: 'return-item-book',
            title: 'Return Item/Book',
            type: 'item',
            url: '/inventory/return-item-book',
            icon: icons.ImportOutlined,
            target: false
        }
    ]
};

export default inventory;
