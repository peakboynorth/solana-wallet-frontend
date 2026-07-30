'use client';

import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useEffect, useState } from 'react';
import { LogOut, Wallet } from 'lucide-react';

export default function WalletConnectButton() {
    const { connection } = useConnection();
    const { publicKey, connected, disconnect } = useWallet();
    const { setVisible } = useWalletModal();
    const [balance, setBalance] = useState<number | null>(null);

    useEffect(() => {
        let active = true;
        
        const fetchBalance = async () => {
            if (publicKey && connection) {
                try {
                    const bal = await connection.getBalance(publicKey);
                    if (active) {
                        setBalance(bal / LAMPORTS_PER_SOL);
                    }
                } catch (e) {
                    console.error("Failed to fetch balance", e);
                }
            } else {
                setBalance(null);
            }
        };

        fetchBalance();

        let subscriptionId = 0;
        if (publicKey && connection) {
            subscriptionId = connection.onAccountChange(publicKey, (accountInfo) => {
                if (active) {
                    setBalance(accountInfo.lamports / LAMPORTS_PER_SOL);
                }
            });
        }

        return () => {
            active = false;
            if (subscriptionId) {
                connection.removeAccountChangeListener(subscriptionId);
            }
        };
    }, [publicKey, connection]);

    const formatAddress = (address: string) => {
        return `${address.slice(0, 4)}...${address.slice(-4)}`;
    };

    if (connected && publicKey) {
        return (
            <div className="flex items-center gap-4 bg-zinc-100 dark:bg-zinc-800 p-2 rounded-full px-4 border border-zinc-200 dark:border-zinc-700">
                <div className="flex flex-col items-end mr-2">
                    <span className="text-xs text-zinc-500 font-medium">Balance</span>
                    <span className="text-sm font-bold">{balance !== null ? balance.toFixed(2) : '0.00'} SOL</span>
                </div>
                <div className="h-8 w-px bg-zinc-300 dark:bg-zinc-600" />
                <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-indigo-500 flex items-center justify-center">
                        <Wallet className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-sm font-mono font-medium">{formatAddress(publicKey.toBase58())}</span>
                </div>
                <button
                    onClick={() => disconnect()}
                    className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full transition-colors ml-2 text-zinc-500 hover:text-red-500"
                    title="Disconnect"
                >
                    <LogOut className="h-4 w-4" />
                </button>
            </div>
        );
    }

    return (
        <button
            onClick={() => setVisible(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-full font-medium transition-colors shadow-sm cursor-pointer"
        >
            <Wallet className="h-4 w-4" />
            Connect Wallet
        </button>
    );
}
