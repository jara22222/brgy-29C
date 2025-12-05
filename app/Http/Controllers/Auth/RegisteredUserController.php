<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
       
        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'firstName' => 'required|string|max:255',
            'middleName' => 'nullable|string|max:255',
            'lastName' => 'required|string|max:255',
            'gender' => 'nullable|string|max:255',
            'civilStatus' => 'required|string|max:255',
            'dateOfBirth' => 'required|date',
            'street' => 'required|string|max:255',
            'purok' => 'required|string|max:255',
            'barangay' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'province' => 'required|string|max:255',
            'postal' => 'required|string|max:255',
            'mobileNo' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'userName' => 'required|string|max:255|unique:users,userName',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);
       
        $user = User::create([
            'name' => $validated['name'] ?? trim($validated['firstName'] . ' ' . $validated['lastName']),
            'firstName' => $validated['firstName'],
            'middleName' => $validated['middleName'] ?? null,
            'lastName' => $validated['lastName'],
            'gender' => $validated['gender'] ?? null,
            'civilStatus' => $validated['civilStatus'],
            'dateOfBirth' => $validated['dateOfBirth'],
            'street' => $validated['street'],
            'purok' => $validated['purok'],
            'barangay' => $validated['barangay'],
            'city' => $validated['city'],
            'province' => $validated['province'],
            'postal' => $validated['postal'],
            'mobileNo' => $validated['mobileNo'],
            'userName' => $validated['userName'],
            'email' => $validated['email'],
            'password' => $validated['password'],
            'role' => 'resident', // Default role and secured
        ]);

        event(new Registered($user));

        Auth::login($user);

        return match($user->role){
            'admin'=>redirect()->route('dashboard'),
            'staff'=>redirect()->route('dashboard'),
            default =>redirect()->route('dashboard'),
        };
    }
}