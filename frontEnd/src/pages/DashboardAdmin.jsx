import React, { useEffect, useState } from 'react'
import axios from 'axios'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

const DashboardAdmin = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState(null)
    const [rejectModalOpen, setRejectModalOpen] = useState(false)
    const [rejectNote, setRejectNote] = useState('')
    const [pendingRejectOrderId, setPendingRejectOrderId] = useState(null)
    const [detailModalOpen, setDetailModalOpen] = useState(false)
    const [detailOrder, setDetailOrder] = useState(null)

    const API = import.meta.env.VITE_API_URL

    useEffect(() => {
        fetchOrders()
    }, [])

    const fetchOrders = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${API}/api/admin/orders`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            // sort by user email (nulls last)
            const sorted = res.data.sort((a, b) => {
                const ea = a.user?.email || '~~~~';
                const eb = b.user?.email || '~~~~';
                return ea.localeCompare(eb)
            })
            // fetch merch details for each order to compute final price
            const withMerch = await Promise.all(sorted.map(async (order) => {
                try {
                    const merchRes = await axios.get(`${API}/api/merch/${order.id_item}`)
                    const merch = merchRes.data
                    const total_price = (Number(merch.price) || 0) * (Number(order.quantity) || 0)
                    return { ...order, merch, total_price }
                } catch (err) {
                    // if merch fetch fails, still return order
                    return { ...order, merch: null, total_price: null }
                }
            }))
            setOrders(withMerch)
        } catch (err) {
            console.error(err)
            setOrders([])
        } finally {
            setLoading(false)
        }
    }

    // group by user email
    const grouped = orders.reduce((acc, order) => {
        const key = order.user?.email || 'unknown@unknown'
        if (!acc[key]) acc[key] = { user: order.user || null, items: [] }
        acc[key].items.push(order)
        return acc
    }, {})

    const statuses = [
        'dikonfirmasi',
        'dibuat',
        'dipacking',
        'siap diambil',
        'ditolak',
    ]

    const statusColorg = {
        "Order Dikonfirmasi": "bg-[#DB5F4A]",
        "Order Dibuat": "bg-[#F66951]",
        "Order Dipacking": "bg-[#C15A23]",
        "Order Siap Diambil": "bg-[#57ad42]",
        "Order Selesai": "bg-[#3b82f6]",
        "Order Ditolak": "bg-[#FF0505]",
    }

    const getStatusClass = (status) => {
        const normalized = (status || '').toString().toLowerCase()
        const key = Object.keys(statusColorg).find(k => k.toLowerCase().includes(normalized))
        return statusColorg[key] || 'bg-gray-500'
    }

    const formatDate = (d) => {
        if (!d) return '—'
        try {
            return new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(d))
        } catch (e) {
            return d
        }
    }

    const formatPrice = (value) => {
        if (value == null) return '—'
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(Number(value))
    }

    const handleStatusChange = async (orderId, newStatus, note = null) => {
        setUpdating(orderId)
        try {
            const body = { order_status: newStatus }
            if (note !== null) body.admin_note = note

            const res = await axios.patch(
                `${API}/api/admin/orders/${orderId}`,
                body,
                {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            )

            // merge returned order with existing data (keep user, merch & total_price)
            setOrders((prev) => prev.map((o) => {
                if (o.id !== res.data.id) return o
                return { ...o, ...res.data, user: o.user ?? res.data.user, merch: o.merch ?? res.data.merch, total_price: o.total_price ?? res.data.total_price }
            }))
        } catch (err) {
            console.error(err)
            alert('Failed to update status')
        } finally {
            setUpdating(null)
            // clear reject modal state
            setRejectNote('')
            setPendingRejectOrderId(null)
            setRejectModalOpen(false)
        }
    }

    const handleStatusSelect = (orderId, value) => {
        if ((value || '').toString().toLowerCase() === 'ditolak') {
            // open modal to confirm and input note
            setPendingRejectOrderId(orderId)
            setRejectNote('')
            setRejectModalOpen(true)
            return
        }
        // direct change for other statuses
        handleStatusChange(orderId, value)
    }

    // split orders into current, canceled and finished
    const canceledOrders = orders.filter(o => (o.order_status || '').toString().toLowerCase().includes('ditolak'))
    const finishedOrders = orders.filter(o => (o.order_status || '').toString().toLowerCase().includes('selesai'))
    const currentOrders = orders.filter(o => {
        const s = (o.order_status || '').toString().toLowerCase()
        return !s.includes('selesai') && !s.includes('ditolak')
    })

    const groupByUser = (list) => list.reduce((acc, order) => {
        const key = order.user?.email || 'unknown@unknown'
        if (!acc[key]) acc[key] = { user: order.user || null, items: [] }
        acc[key].items.push(order)
        return acc
    }, {})

    const currentGrouped = groupByUser(currentOrders)
    const canceledGrouped = groupByUser(canceledOrders)
    const finishedGrouped = groupByUser(finishedOrders)

    return (
        <>
            <div className="top-0 text-white">
                <NavBar />
            </div>

            <div className="min-h-screen bg-[#151515] text-white p-10 items-start w-full">
                <div className="max-w-[75%] m-auto">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-3xl font-bold text-[#E56F56]">Admin — Orders</h1>
                        <div>
                            <button
                                onClick={fetchOrders}
                                className="bg-[#E56F56] text-white px-4 py-2 rounded-md font-semibold"
                            >
                                Refresh
                            </button>
                        </div>
                    </div>

                    {loading ? (
                        <p>Loading orders…</p>
                    ) : (
                        <div className="space-y-8">
                            {/* Current Orders */}
                            <div>
                                <h2 className="text-xl font-semibold text-[#E56F56] mb-3">Current Orders</h2>
                                {Object.keys(currentGrouped).length === 0 ? (
                                    <p className="text-gray-300">No current orders.</p>
                                ) : (
                                    Object.keys(currentGrouped).map((email) => {
                                        const group = currentGrouped[email]
                                        return (
                                            <div key={"cur-" + email} className="bg-[#1a1a1a] rounded-xl p-4 border border-[#E56F56] shadow-[1px_5px_7px_0_rgba(246,105,81,0.10)] transition-all duration-300 hover:shadow-lg hover:shadow-[#f6695133] hover:scale-[1.01] active:scale-[0.99] mb-4">
                                                <div className="flex items-center justify-between mb-3">
                                                    <div>
                                                        <div className="text-sm text-gray-300">User</div>
                                                        <div className="font-semibold">{group.user ? `${group.user.name} — ${group.user.email}` : 'Unknown User'}</div>
                                                    </div>
                                                    <div className="text-sm text-gray-400">{group.items.length} orders</div>
                                                </div>

                                                <div className="overflow-x-auto">
                                                    <table className="w-full table-auto border-collapse">
                                                        <thead>
                                                            <tr className="text-left border-b border-[#E56F56]">
                                                                <th className="py-3 px-4 font-semibold text-[#E56F56]">ID</th>
                                                                <th className="py-3 px-4 font-semibold text-[#E56F56]">Item</th>
                                                                <th className="py-3 px-4 font-semibold text-[#E56F56]">Qty</th>
                                                                <th className="py-3 px-4 font-semibold text-[#E56F56]">Date</th>
                                                                <th className="py-3 px-4 font-semibold text-[#E56F56]">Status</th>
                                                                <th className="py-3 px-4 font-semibold text-[#E56F56]">Price</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {group.items.map((order) => (
                                                                <tr key={order.id} className="border-b border-gray-700 hover:bg-[#2a2a2a] transition-colors">
                                                                    <td className="py-3 px-4">#{order.id_order}</td>
                                                                    <td className="py-3 px-4">{order.id_item}</td>
                                                                    <td className="py-3 px-4">{order.quantity}</td>
                                                                    <td className="py-3 px-4">{formatDate(order.order_date)}</td>
                                                                    <td className="py-3 px-4">
                                                                        <select
                                                                            value={order.order_status}
                                                                            onChange={(e) => { handleStatusSelect(order.id, e.target.value) }}
                                                                            disabled={updating === order.id}
                                                                            className={`${getStatusClass(order.order_status)} text-white p-1 rounded border-none`}
                                                                        >
                                                                            {statuses.map((s) => (
                                                                                <option key={s} value={s}>
                                                                                    {s}
                                                                                </option>
                                                                            ))}
                                                                        </select>
                                                                    </td>
                                                                    <td className="py-3 px-4">{updating === order.id ? 'Updating…' : formatPrice(order.total_price)}</td>
                                                                    <td className="py-3 px-4">
                                                                        <button
                                                                            onClick={() => { setDetailOrder(order); setDetailModalOpen(true) }}
                                                                            className="ml-2 px-3 py-1 bg-transparent border border-white text-white rounded hover:bg-white hover:text-black"
                                                                        >
                                                                            Detail
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        )
                                    })
                                )}
                            </div>

                            {/* Finished Orders */}
                            <div>
                                <h2 className="text-xl font-semibold text-[#E56F56] mb-3">Finished Orders</h2>
                                {Object.keys(finishedGrouped).length === 0 ? (
                                    <p className="text-gray-300">No finished orders.</p>
                                ) : (
                                    Object.keys(finishedGrouped).map((email) => {
                                        const group = finishedGrouped[email]
                                        return (
                                            <div key={"fin-" + email} className="bg-[#0f1720] rounded-xl p-4 border border-[#334155] shadow-sm transition-all duration-200 mb-4">
                                                <div className="flex items-center justify-between mb-3">
                                                    <div>
                                                        <div className="text-sm text-gray-400">User</div>
                                                        <div className="font-semibold">{group.user ? `${group.user.name} — ${group.user.email}` : 'Unknown User'}</div>
                                                    </div>
                                                    <div className="text-sm text-gray-400">{group.items.length} orders</div>
                                                </div>

                                                <div className="overflow-x-auto">
                                                    <table className="w-full table-auto border-collapse">
                                                        <thead>
                                                            <tr className="text-left border-b border-gray-700">
                                                                <th className="py-3 px-4 font-semibold text-gray-300">ID</th>
                                                                <th className="py-3 px-4 font-semibold text-gray-300">Item</th>
                                                                <th className="py-3 px-4 font-semibold text-gray-300">Qty</th>
                                                                <th className="py-3 px-4 font-semibold text-gray-300">Date</th>
                                                                <th className="py-3 px-4 font-semibold text-gray-300">Status</th>
                                                                <th className="py-3 px-4 font-semibold text-gray-300">Price</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {group.items.map((order) => (
                                                                <tr key={order.id} className="border-b border-gray-800">
                                                                    <td className="py-3 px-4">#{order.id_order}</td>
                                                                    <td className="py-3 px-4">{order.id_item}</td>
                                                                    <td className="py-3 px-4">{order.quantity}</td>
                                                                    <td className="py-3 px-4">{formatDate(order.order_date)}</td>
                                                                    <td className="py-3 px-4">
                                                                        <div className={`${getStatusClass(order.order_status)} text-white px-3 py-1 rounded-full inline-block`}>{order.order_status}</div>
                                                                    </td>
                                                                    <td className="py-3 px-4">{formatPrice(order.total_price)}</td>
                                                                    <td className="py-3 px-4">
                                                                        <button
                                                                            onClick={() => { setDetailOrder(order); setDetailModalOpen(true) }}
                                                                            className="ml-2 px-3 py-1 bg-transparent border border-white text-white rounded hover:bg-white hover:text-black"
                                                                        >
                                                                            Detail
                                                                        </button>
                                                                    </td>
                                                                    <td className="py-3 px-4">
                                                                        {/* <button
                                                                            onClick={() => { setDetailOrder(order); setDetailModalOpen(true) }}
                                                                            className="ml-2 px-3 py-1 bg-transparent border border-white text-white rounded hover:bg-white hover:text-black"
                                                                        >
                                                                            Detail
                                                                        </button> */}
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        )
                                    })
                                )}
                            </div>
                            {/* Canceled Orders */}
                            <div>
                                <h2 className="text-xl font-semibold text-[#E56F56] mb-3">Canceled Orders</h2>
                                {Object.keys(canceledGrouped).length === 0 ? (
                                    <p className="text-gray-300">No canceled orders.</p>
                                ) : (
                                    Object.keys(canceledGrouped).map((email) => {
                                        const group = canceledGrouped[email]
                                        return (
                                            <div key={"can-" + email} className="bg-[#1a0f0f] rounded-xl p-4 border border-[#FF0505] shadow-[1px_2px_4px_0_rgba(255,5,5,0.06)] transition-all duration-300 mb-4">
                                                <div className="flex items-center justify-between mb-3">
                                                    <div>
                                                        <div className="text-sm text-gray-300">User</div>
                                                        <div className="font-semibold">{group.user ? `${group.user.name} — ${group.user.email}` : 'Unknown User'}</div>
                                                    </div>
                                                    <div className="text-sm text-gray-400">{group.items.length} orders</div>
                                                </div>

                                                <div className="overflow-x-auto">
                                                    <table className="w-full table-auto border-collapse">
                                                        <thead>
                                                            <tr className="text-left border-b border-red-700">
                                                                <th className="py-3 px-4 font-semibold text-red-300">ID</th>
                                                                <th className="py-3 px-4 font-semibold text-red-300">Item</th>
                                                                <th className="py-3 px-4 font-semibold text-red-300">Qty</th>
                                                                <th className="py-3 px-4 font-semibold text-red-300">Date</th>
                                                                <th className="py-3 px-4 font-semibold text-red-300">Status</th>
                                                                <th className="py-3 px-4 font-semibold text-red-300">Note</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {group.items.map((order) => (
                                                                <tr key={order.id} className="border-b border-gray-800 hover:bg-[#2a0b0b] transition-colors">
                                                                    <td className="py-3 px-4">#{order.id_order}</td>
                                                                    <td className="py-3 px-4">{order.id_item}</td>
                                                                    <td className="py-3 px-4">{order.quantity}</td>
                                                                    <td className="py-3 px-4">{formatDate(order.order_date)}</td>
                                                                    <td className="py-3 px-4"><div className={`${getStatusClass(order.order_status)} text-white px-3 py-1 rounded-full inline-block`}>{order.order_status}</div></td>
                                                                    <td className="py-3 px-4 text-sm text-red-100">{order.admin_note || '—'}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        )
                                    })
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Reject confirmation modal */}
            {rejectModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-[#0f1720] rounded-lg p-6 w-[90%] max-w-lg border border-[#E56F56]">
                        <h3 className="text-lg font-semibold mb-2 text-[#E56F56]">Konfirmasi Penolakan</h3>
                        <p className="text-sm text-gray-300 mb-4">Apakah kamu yakin akan menolak pesanan ini? Tambahkan catatan untuk user (opsional):</p>

                        <textarea
                            value={rejectNote}
                            onChange={(e) => setRejectNote(e.target.value)}
                            placeholder="Tuliskan alasan penolakan..."
                            className="w-full p-3 rounded bg-[#111827] text-white border border-gray-700 mb-4"
                            rows={4}
                        />

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => {
                                    // cancel
                                    setRejectModalOpen(false)
                                    setPendingRejectOrderId(null)
                                    setRejectNote('')
                                }}
                                className="px-4 py-2 rounded bg-gray-600 text-white"
                            >Batal</button>
                            <button
                                onClick={() => {
                                    if (!pendingRejectOrderId) return
                                    handleStatusChange(pendingRejectOrderId, 'ditolak', rejectNote)
                                }}
                                className="px-4 py-2 rounded bg-[#FF0505] text-white font-semibold"
                            >Tolak Pesanan</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Order detail modal */}
            {detailModalOpen && detailOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-[#0f1720] rounded-lg p-6 w-[90%] max-w-md border border-[#E56F56]">
                        <h3 className="text-lg font-semibold mb-2 text-[#E56F56]">Order Detail</h3>
                        <div className="text-sm text-gray-300 mb-4">
                            <div className="mb-2"><strong>No. Whatsapp:</strong> <span className="text-white">{detailOrder.no_whatsapp || '—'}</span></div>
                        </div>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => { setDetailModalOpen(false); setDetailOrder(null) }}
                                className="px-4 py-2 rounded bg-gray-600 text-white"
                            >Close</button>
                            <button
                                onClick={() => {
                                    if (!detailOrder?.ktm_path) {
                                        alert('No KTM file available')
                                        return
                                    }
                                    const url = `${API}/storage/${detailOrder.ktm_path}`
                                    window.open(url, '_blank')
                                }}
                                className="px-4 py-2 rounded bg-[#E56F56] text-white font-semibold"
                            >Open KTM</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
export default DashboardAdmin