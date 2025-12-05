<?php

namespace App\Http\Controllers;

use App\Models\RequestedCertificate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class GuestCertificateController extends Controller
{
    /**
     * Store a newly created guest certificate request.
     */
    public function store(Request $request)
    {
        // Log the incoming request data for debugging
        Log::info('Guest certificate request data:', $request->all());
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:500',
            'purpose' => 'required|string|max:1000',
            'document_id' => 'required|integer',
            'document_name' => 'required|string|max:255',
        ]);

        // Log validated data
        Log::info('Validated data:', $validated);

        // Create guest certificate request with userstatus set to 'guest'
        $certificate = RequestedCertificate::create([
            'user_id' => null, // Guest users don't have user_id
            'name' => $validated['name'],
            'address' => $validated['address'],
            'purpose' => $validated['purpose'],
            'document_name' => $validated['document_name'],
            'status' => 'pending',
            'userstatus' => 'guest', // Set user status to guest
        ]);

        return redirect()->back()->with('success', 'Certificate request submitted successfully!');
    }
}
