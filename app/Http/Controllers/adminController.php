<?php

namespace App\Http\Controllers;
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
class adminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       $residents = [
        [
            'id' => '1223',
            'name' => 'Azuela',
            'role' => 'mama',
            'email' => 'pending',
            'createdAt' => 'm@example.com',
        ]
    ];

    // 2. Pass data to the React page component
    return Inertia::render('auth/admindashboard', [
        'residents' => $residents
    ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'firstName' => 'required|string|max:255',
                'middleName' => 'nullable|string|max:255',
                'lastName' => 'required|string|max:255',
                'gender' => 'nullable|in:Male,Female',
                'civilStatus' => 'required|in:Single,Married,Divorced,Widowed',
                'dateOfBirth' => 'nullable|date',
                'street' => 'nullable|string|max:255',
                'purok' => 'nullable|string|max:255',
                'barangay' => 'nullable|string|max:255',
                'city' => 'nullable|string|max:255',
                'province' => 'nullable|string|max:255',
                'postal' => 'nullable|string|max:20',
                'email' => 'required|email|unique:users,email',
                'mobileNo' => 'nullable|string|max:20',
                'userName' => 'required|string|unique:users,userName|max:255',
                'password' => 'required|string|min:8|confirmed',
            ]);

            $validated['password'] = bcrypt($validated['password']);
            $validated['role'] = 'staff';
            $validated['name'] = $validated['firstName'] . ' ' . $validated['lastName'];

            $user = User::create($validated);

            return redirect()->route('adminaccountmanagement')->with('success', 'Staff account created successfully');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withInput()
                ->with('error', 'Error creating staff account: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}